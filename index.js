import express from "express";
import dotenv from "dotenv";

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:true}));

const PORT = process.env.PORT || 4500;

app.listen(()=>{
    console.log(`server is running on ${PORT}`)
})
