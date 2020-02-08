const app = require("express")();
const cors = require('cors');
const server = require("http").createServer(app)
const io = require("socket.io")(server);
const port = 3000;

app.use(cors());
io.set("origins", "*:*")

const users = [];


io.on("connection", (socket) => {
    console.log("connected")
    
    socket.on("message", (evt) => {
        console.log(evt);
        socket.broadcast.emit("message", evt)
    })
})




server.listen(port, () => console.log(`server listneing on port: ${port}`))

