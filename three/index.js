const logEvents = require('./logEvents');

const EventEmitter = require('events');
const { fstat } = require('fs');

class MyEmitter extends EventEmitter { };

//Initialize object
const myEmitter = new MyEmitter();

//add listener for the log event
myEmitter.on('log', (msg) => logEvents(msg));

for(i = 0; i < 10; i++){
   task(i);
}

function task(i){
    setTimeout(() => {
        //emit event
        myEmitter.emit('log', 'Log event emitted!');
    }, 2000*i);
}




