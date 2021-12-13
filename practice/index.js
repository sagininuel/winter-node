const fsPromises = require('fs').promises;
const fs = require('fs');
const Emitter = require('events');
const path = require('path');

class MyEmitter extends Emitter { };

const myEmitter = new MyEmitter;

// const logEvent = async (msg) => {
myEmitter.on('log', async (msg) =>{
    //task
    try{
        if(!fs.existsSync(path.join(__dirname, 'log_s'))){
            await fsPromises.mkdir(path.join(__dirname, 'log_s'))
        }
        await fsPromises.appendFile(path.join(__dirname, 'log_s', 'eventLog.txt'), msg)
        console.log(msg)

    }catch( error ){
        console.log(error);
    }
})





// Event emitter
for (let i = 2; i < 22; i++){
    setTimeout(() => {
        myEmitter.emit('log', `Log Event Emitted ${i}\n`)
    },
    i*1000)

}
