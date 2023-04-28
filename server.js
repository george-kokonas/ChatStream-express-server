const express = require("express");
const cors = require("cors");
const dbConnect = require("./database/connection");

const publicRoutes = require("./routes/publicRoutes");
const privateRoutes = require("./routes/privateRoutes")

const Port = process.env.PORT || 8000;
const app = express();

dbConnect();

app.use(express.json());
app.use(cors());

app.use("/public", publicRoutes);
app.use("/private" , privateRoutes)

app.listen(Port, () => {
  console.log(`Server is listening on port ${Port}`);
});
