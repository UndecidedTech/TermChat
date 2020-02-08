const app = require("express")();
const server = require("http").createServer(app)
const io = require("socket.io")(server);
const http = require("http");
const port = 3000;

io.on("connection", (socket) => {
    console.log("connected")
    socket.on("message", (evt) => {
        console.log(evt);
        socket.broadcast.emit("message", evt)
    })
})




server.listen(port, () => console.log(`server listneing on port: ${port}`))

