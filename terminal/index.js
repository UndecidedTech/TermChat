const ip = require("ip");

let clientIp = ip.address();
let serverIp = clientIp.substr(0, (clientIp.length - 3));

try {
    for (let i = 0; i <= 255; i++) {
        testConnection = require("socket.io-client")(`http://${serverIp}${i}:3000`, {reconnection: false});
        testConnection.on("connect", () => {
            console.log("here");
            if (testConnection.connected){
                console.log("connected at: " + serverIp+i);
            }
        });
    }
} catch (error) {
    console.error(error);
}



// const socket = require("socket.io-client")("http://localhost:3000");
// const repl = require("repl");

// let username = "";
// const randomNames = ["bran", "alex", "sean", "travis"];

// socket.on("connect", () => {
//     console.log("_______Start Chatttttttttting________")
//     username = process.argv[2];
//     // if (typeof username === "undefined")
//     //     username = randomNames[]
// })

// socket.on("message", (message) => {
//     const {cmd, username} = message;
//     console.log(username + ": " + cmd)
// })

// repl.start({
//     prompt: "",
//     eval: (cmd) => {
//         socket.send({cmd, username})
//     }
// })