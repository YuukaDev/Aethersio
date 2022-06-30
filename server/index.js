const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {

  socket.on("create_room", (room) => {
    socket.join(room);
  });

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
})

server.listen(3000, () => {
  console.log("Server is Running");
});
