const net = require ('node:net')
// import readline from "readline"
const readline = require('readline')

let global = 0;
const relayActuator = async (req, res) => {
    const code = req.body;
    //console.log(code);
  
    const client = new net.Socket()
    if(client){
        client.connect(4000, process.argv[2] ?? "192.168.1.11", () => {
        console.log("Connected to ACU server")
        })
        client.on('error', err=>{
            console.error(`Connected Socket: ${err}`);
            client.destroy();
        })
        client.on("data", (data) => {
        console.log(`${data.toString("utf-8")}\n`)
        })
        
        client.write(`Remantek07@R`);
        res.status(201).json({'message': 'Relay Set' });
        
    }    
}

function replyOne(){
    setTimeout(() => {
        console.log("Reply One!")
        return global;
    }, 4000);
}

const ledActuator = async (req, res) => {
    const code = req.body;
    // console.log("Led running");
  
    const client = new net.Socket()
    if(client){
        client.connect(4000, process.argv[2] ?? "192.168.1.11", () => {
        console.log("Connected to ACU server")
        })
        client.on('error', err=>{
            console.error(`Connected Socket: ${err}`);
            client.destroy();
        })
        client.write(`Remantek07@L`);
        client.on("data", (data) => {
            console.log(`${data.toString("utf-8")}\n`);
            if(data.toString("utf-8")[0] === "L"){
                global = 1;
                console.log("Global set to 1!");
                return res.status(201).json({'message': 'Led Set' });
                // return 1;
            }
        })
        
        
    }    
}

const led2Actuator = async (req, res) =>{
    if(req.body.status = "on"){
        console.log("Led ON!")
        // res.status(201).json({'message': 'Led ON!' });
    }
    
}



const handleCommand = async (req, res) => {
    const { command } = req.body;
    

    if (!command) return res.status(400).json({ 'message': 'Username and password are required.' });
    console.log(req.body);
    res.status(200).json({"message": "Command Success!"});

    const client = new net.Socket()
    if(client){
        client.connect(4000, process.argv[2] ?? "192.168.1.11", () => {
        console.log("Connected to ACU server")
        })
        client.on('error', err=>{
            console.error(`Connected Socket: ${err}`);
            client.destroy();
        })
        client.on("data", (data) => {
        console.log(`${data.toString("utf-8")}\n`)
        })
        
        client.write(command);
        // res.status(201).json({'message': 'Relay Set' });
    }

}



module.exports = { relayActuator, led2Actuator, ledActuator, replyOne, handleCommand };
