const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'lorem.txt'), (error, data)=>{
    if ( error ) throw error;
    console.log(data);
});

process.on('uncaughtException', error => {
    console.error(`There was an uncaught error: ${error}`);
    process.exit(1);
})