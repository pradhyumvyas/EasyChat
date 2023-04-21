const app = require('express')();

const server = require('http').createServer(app);

const io = require('socket.io')(server,{});
io.on("connection",(socket)=>{
    console.log("Socket ", socket);
    console.log("Socket is active");

    socket.on("EasyChat", (payload) =>{
        console.log("Payload ", payload);
        io.emit("EasyChat", payload)
    })
})


// app.listen(5000, ()=> console.log("Server is active..."));
server.listen(5000, ()=>{
    console.log("Server is listing at 5000...")
})