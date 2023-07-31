const express = require("express");
const cors = require("cors");
const dbConnect = require("./database/connection");
const errorHandler = require("./middleware/errorHandler");

const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");

const Port = process.env.PORT || 8000;
const app = express();

dbConnect();

app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({limit:"50mb",extended: true}))
app.use(cors());

app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);
app.use("/user", userRoutes);
app.use("/profile", profileRoutes)

app.use(errorHandler);

app.listen(Port, () => {
  console.log(`Server is listening on port ${Port}`);
});
