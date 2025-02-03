const express=require("express");
const cors=require("cors");
const db = require("./config/db");
const OrderRoutes = require("./routes/orderRoute");

const app=express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
}));

let port=process.env.PORT||5050;


app.use("/api/v1/order",OrderRoutes)


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
    db();
})