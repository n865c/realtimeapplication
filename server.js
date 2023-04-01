const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { Socket } = require("socket.io-client");
const app = express();

const server = http.createServer(app);
const ACTIONS=require('./src/Actions')

const io = new Server(server);
const userSocketMap={};
function getAllConnectedClients(roomId)
{
  return Array.from(io.sockets.adapter.rooms.get(roomId)||[]).map((socketId)=>{
    return{
      socketId,
      username:userSocketMap[socketId],
    }
  });
}

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);
  socket.on(ACTIONS.JOIN,({roomId,username})=>{
    console.log(username);
          userSocketMap[socket.id]=username;   
          socket.join(roomId);
          
          const clients=getAllConnectedClients(roomId);
          clients.forEach(({socketId})=>{
            io.to(socketId).emit(ACTIONS.JOINED,{
              clients,
              username,
              socketId:socket.id,
            })
          })
  })

  socket.on(ACTIONS.CODE_CHANGE,({roomId,code})=>{
    io.to(roomId).emit(ACTIONS.CODE_CHANGE,{code});
  })
  socket.on('disconnecting',()=>{
    const rooms=[...socket.rooms];
    rooms.forEach((roomId)=>{
      socket.in(roomId).emit(ACTIONS.DISCONNECTED,{
        socketId:socket.id,
        username:userSocketMap[socket.id],
      })
    })
delete userSocketMap[socket.id];
socket.leave();
   
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
