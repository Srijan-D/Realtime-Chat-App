const io = require("socket.io")(8000, {
  cors: {
    origin: "*",
  },
});

const users = {};

io.on("connection", (socket) => {
  //io.on listens to several socket connections
  socket.on("new-user-joined", (name) => {
    //new user-joined method
    //socket.on for a particular connection
    console.log("New user just landed!", name);
    users[socket.id] = name; // a method user-joined name can be anything
    //socket.id was used to have unique id for individuals as many might have same name
    socket.broadcast.emit("user-joined", name); //.broadcast.emit  emits to all except the one who has joined the chat
  });
  socket.on("send", (message) => {
    //if anyone sends  broadcast receive method to rest all
    socket.broadcast.emit("receive", {
      message: message,
      name: users[socket.id],
    });
  });
  socket.on("disconnect", (message) => { //disconnect is a default even not any arbitrary name

    socket.broadcast.emit("left", users[socket.id]); //left is user defined any arbitrary name
    delete users[socket.id]; 
  });
});

// io.on('connection',socket=>{
//     socket.on("new-user-joined",name=>{
//         console.log(name,"has joined the chat room")
//         users[socket.id]=name;
//         socket.broadcast.emit('user-joined',name);
//
//     })

//     socket.on("send",message=>{ //send method
//         socket.broadcast.emit("receive",{message:message,name:users[socket.id]}) //receive method
//     })

// })
