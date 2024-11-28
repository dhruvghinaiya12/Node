const express = require('express');
const dbconnect = require('./config/db');
const ProductRouter = require('./routes/ProductRoute');
const path= require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/uploads",express.static(path.join(__dirname,"uploads")));

app.get("/",(req, res) => {
    res.sendFile(path.join(__dirname, 'view/form.html'));
})

app.use("/product",ProductRouter)

const port=process.env.PORT ||5050
app.listen(port,()=>{
    console.log(`App running at http://localhost:${port}`);
    dbconnect()
})