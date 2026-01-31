import express from "express";
import dotenv from "dotenv";
import useUser from './routes/users.route.js';
import useVeh from "./routes/vehicle.route.js";
const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use('/users',useUser);
app.use('/vehicles',useVeh);




app.use('/',()=>{
    return res.json({error:"Route does not exists"})
})
const PORT = process.env.PORT || 4500;

app.listen(()=>{
    console.log(`server is running on ${PORT}`)
})
