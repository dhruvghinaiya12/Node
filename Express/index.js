const express = require("express");
const app = express();

let db=[]
app.use(express.json())

let counter = 0;
app.get("/", (req, res) => {
  res.send(db);
});

app.post("/",(req,res)=>{
  let {name,email,password} = req.body;
  let user={
    name,
    email,
    password,
     id: ++counter
  }
  db.push(user)
  res.status(201).send(db)
})

app.patch("/:id", (req, res) => {
  let { id } = req.params
  let { name, email, password } = req.body;
  let user = db.find((ele) => ele.id == id);
  if (user) {
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;

    res.status(200).send(db);
  } else {
    res.status(404).send("User not found");
  }
});

app.delete("/:id",(req,res)=>{
let {id}=req.params
let data=db.filter((ele)=>ele.id!=id)
  db=data
  res.status(200).send(db)
})

app.listen(5050, () => {
  console.log(`App running at http://localhost:5050`);
});