const socket = require("socket.io-client")("http://localhost:3000");
const repl = require("repl");

let username = "";
const randomNames = ["bran", "alex", "sean", "travis"];

socket.on("connect", () => {
    console.log("_______Start Chatttttttttting________")
    username = process.argv[2];
    if (typeof username === "undefined")
        username = randomNames[]
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