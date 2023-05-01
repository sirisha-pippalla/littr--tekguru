require("dotenv").config();
const express = require('express');
const connectToDB = require("./config/db");
const userRoutes = require("./routes/userRoutes")

const mongoClient = require("mongodb").mongoClient

const app = express();

app.use(express.json());

app.use((req, res, next) =>{
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE")

    next();
})

connectToDB();

app.use("/", userRoutes)


module.exports = app