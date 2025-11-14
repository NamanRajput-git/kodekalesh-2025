// const express = require("express");
const { walletAuthHandler } = require("./auth");
const express = require("express");
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin']
}));
app.post("/api/auth/wallet",(req,res)=>walletAuthHandler(req,res));
app.listen(5500);