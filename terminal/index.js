const socket = require("socket.io-client")("http://localhost:3000");
const repl = require("repl");

let username = "";

socket.on("connect", () => {
    console.log("_______Start Chatttttttttting________")
    username = process.argv[2];
})

socket.on("message", (message) => {
    const {cmd, username} = message;
    console.log(username + ": " + cmd)
})

repl.start({
    prompt: "",
    eval: (cmd) => {
        socket.send({cmd, username})
    }
})