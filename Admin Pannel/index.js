const express = require("express");
const cookieParser = require('cookie-parser')

const path = require("path");
const db = require("./config/db");
const userRouter = require("./routes/userRoute");
const IsLogin = require("./middleware/CheckLogin");
const productRouter = require("./routes/productRoute");
const passport = require("passport");
const session = require("express-session");
const Authentication = require("./middleware/Authentication");

const app = express();
const port = process.env.PORT || 5050;

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(session({secret:"user-session-secret"}))
app.use(passport.initialize());
app.use(passport.session());
Authentication(passport)

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));


app.get("/",IsLogin,(req,res)=>{
  let {username}=req.cookies
  res.render("index", {username});
})
app.use("/user",userRouter)
app.use("/products",productRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  db();
});
