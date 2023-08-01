const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;


const logEvents = require('./logEvents.js');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };
//Initialize object
const myEmitter = new Emitter();
myEmitter.on('log', (msg,logName) => logEvents(msg, logName));
const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, res) => {
    try {
        const rawData = await fsPromises.readFile(
            filePath,
            contentType.includes('image') ? '' : 'utf-8');
        const data =  contentType === 'application/json'
            ? JSON.parse(rawData) : rawData;
        res.writeHead(
            filePath.includes('404.html') ? 404 : 200, 
            { 'Content-Type' : contentType }
            );
        res.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        );

    } catch (error) {
        console.log(error);
        myEmitter.emit('log', `${error.name}: ${error.message}`, 'errorLog.txt');
        res.statusCode = 500;
        res.end();
    }
}

const server = http.createServer((req,res) => {
    console.log(req.url, req.method);
    myEmitter.emit('log', `${req.url}\t${req.method}`, 'requestLog.text');

    const extension = path.extname(req.url)

    let contentType;

    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';
    }

    let filePath = 
        contentType === 'text/html' && req.url === '/'
            ? path.join(__dirname, 'views', 'index.html')
            : contentType === 'text/html' && req.url.slice(-1) === '/'
                ? path.join(__dirname, 'views', rq.url, 'index.html')
                :contentType === 'text/html'
                    ? path.join(__dirname, 'views, req.url')
                    : path.join(__dirname, req.url);
    
    // makes .html extension by default.
    if(!extension && req.url.slice(-1) !== '/') filePath +='.html'

    const fileExists = fs.existsSync(filePath);

    if (fileExists) {
        // serve the file
        serveFile(filePath, contentType, res);
    }
    else{
        switch (path.parse(filePath).base){
            case 'old-page.html':
                res.writeHead(301, {'location' : '/new-page.html'});
                res.end();
                break;
            case 'wwww-page.html':
                res.writeHead(301, {'location' : '/'})
                res.end();
                break;
        }
    }




// if statement FILEPATH 
    // let filePath;

    // if (req.url === '/' || req.url === 'landing_page.html'){
    //     res.statusCode = 200;
    //     res.setHeader('Content-Type', 'text/html');
    //     filePath = path.join(__dirname, 'views', 'index.html');
    //     fs.readFile(filePath, 'utf-8', (error, data) => {
    //         res.end(data);
    //         console.log('sent')
    //     })
    // }
    // if (req.url === '/css/landing_page.css') {
    //     res.statusCode = 200;
    //     res.setHeader('Content-Type', 'text/css');
    //     filePath = path.join(__dirname, 'css', 'landing_page.css');
    //     fs.readFile(filePath, 'utf-8', (error, data) => {
    //         res.end(data);
    //         console.log('sent')
    //     })
    // }
    // if (req.url === '/img/image.jpg') {
    //     res.statusCode = 200;
    //     res.setHeader('Content-Type', 'image/jpeg');
    //     filePath = path.join(__dirname, 'img', 'image.jpg');
    //     fs.readFile(filePath, 'utf-8', (error, data) => {
    //         res.end(data);
    //         console.log('sent')
    //     })
    // }


});
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))







// emitting 10 logs after periods of 2 sec each.

//add listener for the log event
// myEmitter.on('log', (msg) => logEvents(msg));

for(i = 0; i < 10; i++){
    setTimeout(() => {
        //emit event
        myEmitter.emit('log', 'Log event emitted!', 'logEvent.txt')
    }, i%2 == 0 ? 1000*i : (1000*i)-500);
}




