const express = require("express");
const cookieParser = require('cookie-parser')

const path = require("path");
const db = require("./config/db");
const UserRouter = require("./routes/UserRoute");
const BlogRouter = require("./routes/BlogRoute");

const app = express();
const port = process.env.PORT || 9080;

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use("/user",UserRouter)
app.use("/blog",BlogRouter)

app.get("/",(req, res) => {
  res.send("Welcome to the movie API")
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  db();
});
