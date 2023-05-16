const io = require("socket.io")(8080, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUsers = [];

//add user to onlineUsers array when connected
const addUser = (userId, socketId) => {
  !onlineUsers.some((user) => user.userId === userId) &&
    onlineUsers.push({ userId, socketId });
};

//remove user from onlineUsers array when disconnected
const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

//get a user from onlineUsers array
const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("a user connected");

  //take userId and socketId from user and add to the users array
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });
  //exchange messages
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const receiver = getUser(receiverId);
    io.to(receiver?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //remove user from users array when disconnected
  socket.on("disconnect", () => {
    console.log("user disconnected");
    removeUser(socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });

  socket.on("logout", () => {
    console.log("user logged out");
    removeUser(socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });
});
