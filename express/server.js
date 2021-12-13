const express = require('express');
const res = require('express/lib/response');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

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
    next()
}, (req, res) => {
    res.send('Hello World!');
})

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

app.get('/*', (req,res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));