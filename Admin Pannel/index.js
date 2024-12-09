const express = require("express");
const path = require("path");
const db = require("./config/db");
const userRouter = require("./routes/userRoute");

const app = express();
const port = process.env.PORT || 5050;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));


app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/",(req,res)=>{
  res.render("index");
})
app.use("/user",userRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  db();
});
