const app = require("express")();
const cors = require('cors');
const server = require("http").createServer(app)
const io = require("socket.io")(server);
const port = 3000;

app.use(cors());
io.set("origins", "*:*")

const users = [];


io.on("connection", (socket) => {
    // console.log("connected")
    
    socket.on("JOIN", (evt) => {
        users.push(evt);
        console.log("userlist: ", users);
    })
    socket.on("message", (evt) => {
        console.log("EVENT: ", evt);
        if (evt.cmd[0] === "!") {
            let parsedString = evt.cmd.split("!");
            let args = [];
            args = parsedString[1].split(" ");
            // I need to trim the newline character
            args[args.length - 1] = args[args.length - 1].slice(0, -1)
            console.log(args);
            console.log("COMMAND? : ", args[0])
            switch (args[0].toLowerCase()) {
                case "list":
                    io.emit("message", {"username": "Admin", "cmd": `Connected Users: ${users}\n`})
                    break;
                case "help":
                    io.emit("message", {"username": "Admin", "cmd": "\n!list -- List all connected users \n!help -- list commands \n!dm <username> -- Send a user a private message \n"})
                    break;
                case "dm":
                    let selectedUser = users.find(user => user.username === args[1]);
                    let message = args.slice(2, args.length).toString();
                    io.to(`${selectedUser.userId}`).send({"username": `${evt.username} (private message)`, "cmd": message});
                    break;
            }

        } else {
            console.log(evt);
            socket.broadcast.emit("message", evt)
        }
    })
})




server.listen(port, () => console.log(`server listening on port: ${port}`))

