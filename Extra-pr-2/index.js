const express = require("express");

const path = require("path");
const passport = require("passport");
const session = require("express-session");
const userRouter = require("./routes/UserRoute");
const db = require("./config/db");
const Authentication = require("./middleware/Authentication");

const app = express();
const port = process.env.PORT || 5151;


app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(session({secret:"user-session-secret"}))
app.use(passport.initialize());
app.use(passport.session());
Authentication(passport)

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use("/user",userRouter)

app.get("/",(req,res)=>{
 res.render("index")
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  db();
});
