const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { Socket } = require("socket.io-client");
const app = express();

const server = http.createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
