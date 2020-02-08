const ip = require("ip");

let clientIp = ip.address();
let serverIp = clientIp.substr(0, (clientIp.length - 3));
const yargs = require("yargs");

const repl = require("repl");

let username = "";
const randomNames = ["bran", "alex", "sean", "travis"];

const argv = yargs
  .option("username", {
    alias: "u",
    description: "Set username",
    type: "string"
  })
  .option("host", {
    alias: "h",
    description: "Set host to connect to (ex: \"bluedragon\" or \"192.168.0.2\")",
    type: "string"
  })
  .argv;

if (argv.username) {
  username = argv.username;
} else {
  username = randomNames[Math.floor(Math.random() * randomNames.length)]
}

console.log(argv.host);

if (!argv.host) {
    console.log("here");
  let socket = require("socket.io-client")("http://localhost:3000", {
    reconnection: false
  });
  socket.on("connect", () => {
    console.log("_______Start Chatting________" + username);
    socket.send({username: "Admin"}, {cmd: `Welcome ${username} to the server\n`})
  })
  socket.on("message", (message) => {
    const {
      cmd,
      username
    } = message;
    console.log(username + ": " + cmd)
  })
  repl.start({
    prompt: "",
    eval: (cmd) => {
      socket.send({
        cmd,
        username
      })
    }
  })
} else {
    console.log("there");
  let socket = require("socket.io-client")(`http://${argv.host}:3000`, {
    reconnection: false
  });
  socket.on("connect", () => {
    console.log("_______Start Chatttttttttting________" + username)
    socket.send({
      username
    })
  })
  socket.on("message", (message) => {
    const {
      cmd,
      username
    } = message;
    console.log(username + ": " + cmd)
  })
  repl.start({
    prompt: "",
    eval: (cmd) => {
      socket.send({
        cmd,
        username
      })
    }
  })
}


// const socket = require("socket.io-client")("http://bluedragon:3000");



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