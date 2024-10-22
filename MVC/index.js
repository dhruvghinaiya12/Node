const express = require('express');
const dbconnect = require('./config/db');
const userRouter = require('./routes/UserRoute');
const ProductRouter = require('./routes/ProductRoute');

const app = express();
app.use(express.json());

app.use("/user", userRouter); 
app.use("/product",ProductRouter)
app.listen(5000,()=>{
    console.log(`App running at http://localhost:5000`);
    dbconnect()
})