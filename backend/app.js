const express=require('express');
const app=express();
require('dotenv').config();
require('./models/db')
const TaskRouter=require('./routes/TaskRouter');
const bodyParser = require('body-parser');
const cors=require('cors')
const PORT= process.env.PORT||8080;
app.use(cors())
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send("Server is ready")
})

app.use('/tasks',TaskRouter);

app.listen(PORT,(req,res)=>{
    console.log(`app is listening on PORT:${PORT}`);
})