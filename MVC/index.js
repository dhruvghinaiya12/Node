const express = require('express');
const dbconnect = require('./config/db');
const ProductRouter = require('./routes/ProductRoute');

const app = express();
app.use(express.json());

app.use("/product",ProductRouter)

const port=process.env.PORT ||5050
app.listen(port,()=>{
    console.log(`App running at http://localhost:5000`);
    dbconnect()
})