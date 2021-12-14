const express = require('express');
const res = require('express/lib/response');
const app = express();
const path = require('path');
const cors = require('cors');
const { corsOptions } = require('./middleware/cors');
const { logger } = require('./middleware/logEvents');
const { errorHandler } = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing blocking point!
app.use(cors(corsOptions));

// Built-in middleware to handle urlencoded data
// in the other words, form data: 
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false}));

// built-in middleware for json
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, '/public')));


// ^/$|/index.html 'It must start and end with '/' or index/html
app.get('^/$|/index(.html)?', (req, res) => {
    // res.sendFile('./views/index.html', {root:__dirname});
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
});

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html'); //302 by default
})

//Route handlers
app.get('/hello(.html)?', (req, res, next) => {  // function chained..
    console.log('Attempted to load hello.html');
    next();
}, (req, res) => {
    res.send('Hello World!');
})

// chain paths
const one = (req, res, next) => {
    console.log('one');
    next();
}

const two = (req, res, next) => {
    console.log('two');
    next();
}

const three = (req, res, next) => {
    console.log('three');
    res.send('Finito!')
}

app.get('/chain(.html)?', [one,two,three]);

// all other route paths ---> app.all accepsts regex! app.use doesn't
// custom not found
app.all('*', (req,res) => {
    res.status(404);
    if (req.acceptsCharsets('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')){
        res.json({ eror: "404 Not Found" })
    } else {
        res.type('txt'.send("404 Not Found"));
    }
    
})

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));