const express = require("express");
const cors = require("cors");
const dbConnect = require("./database/connection");

const usersRoutes = require("./routes/publicRoutes/userRoutes");

const Port = process.env.PORT || 8000;
const app = express();

dbConnect();

app.use(express.json());
app.use(cors());

app.use("/users", usersRoutes);

app.listen(Port, () => {
  console.log(`Server is listening on port ${Port}`);
});
