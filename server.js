const express = require("express");
const cors = require("cors");
const dbConnect = require("./database/connection");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const conversationRoute = require("./routes/conversations");


const Port = process.env.PORT || 8000;
const app = express();

dbConnect();

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/conversation",conversationRoute)

app.listen(Port, () => {
  console.log(`Server is listening on port ${Port}`);
});