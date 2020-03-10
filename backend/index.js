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
        users.push({"user": evt.username});
        console.log("userlist: ", users);
    })
    socket.on("message", (evt) => {
        if (evt.cmd[0] === "!") {
            let parsedString = evt.cmd.split("!");
            let args = [];
            try {
                args = parsedString[1].split(" ");
            } catch {
                args.push(parsedString[1])
            }
            console.log(args);
            console.log("COMMAND? : ", args[0])
            console.log(evt);
            switch (args[0].toLowerCase()) {
                case "list":
                    console.log("did it work?")
                    io.emit("message", {"username": "Admin", "cmd": `Connected Users: ${users}\n`})
                    break;
                case "help":
                    io.emit("message", {"username": "Admin", "cmd": "\n!list -- List all connected users \n!help -- list commands \n!dm <username> -- Send a user a private message \n"})
                    break;
                case "dm":
                    let selectedUser = users.find(user => user.name === args[1]);
                    console.log("DM: ", selectedUser);
                    // io.to()
            }

        } else {
            console.log(evt);
            socket.broadcast.emit("message", evt)
        }
    })
})




server.listen(port, () => console.log(`server listening on port: ${port}`))

