const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let streams = {};

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("createStream", (streamId) => {
    streams[streamId] = socket.id;
    socket.join(streamId);
  });

  socket.on("stream", ({ streamId, data }) => {
    socket.to(streamId).emit("stream", data);
  });

  socket.on("joinStream", (streamId) => {
    if (streams[streamId]) {
      socket.join(streamId);
    }
  });

  socket.on("disconnect", () => {
    for (let streamId in streams) {
      if (streams[streamId] === socket.id) {
        delete streams[streamId];
        io.to(streamId).emit("endStream");
      }
    }
    console.log("Client disconnected");
  });
});

const PORT = 3004;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
