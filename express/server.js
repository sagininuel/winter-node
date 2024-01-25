const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const { errorHandler } = require('./middleware/errorHandler');
const { mcuActuator } = require('./controllers/mcuController');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials.js');

const PORT = process.env.PORT || 7770;

// custom middleware logger
app.use(logger);

// Handle options credentials check -before CORS
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing blocking point!
app.use(cors(corsOptions));

// Built-in middleware to handle urlencoded data form data: 
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// serve static files
app.use('/', express.static(path.join(__dirname, '/public')));


// handle incoming routes without authorization needed
//app.use('/favicon.ico', require('./routes/root'));
app.use('/', require('./routes/root'));
// app.use('/', require('./routes/root'));
app.use('/mcu', require('./routes/mcu'));

app.use('/style.css', require('./routes/root'));
app.use('/script.js', require('./routes/root'));
app.use('/image.png', require('./routes/root'));
app.use('/remantek.png', require('./routes/root'));
//app.use('/public/css/font-awesome-4.7.0/css/font-awesome.min.css', require('./routes/root'));


// handle incoming routes with authorization needed
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use('/users', require('./routes/api/entrants'));

app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));

// all other route paths ---> app.all accepts regex! app.use doesn't (does in newer versions)
// custom not found
app.all('*', (req, res) => {
    res.status(404);
    if (req.acceptsCharsets('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ eror: "404 Not Found" })
    } else {
        res.type('txt'.send("404 Not Found"));
    }

})

app.use(errorHandler);

app.listen(PORT, () => console.log(`Remantek Server is running on port ${PORT}`));
