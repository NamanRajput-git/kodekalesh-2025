require("dotenv").config();
const { walletAuthHandler } = require("./auth");
const express = require("express");
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5500;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

app.use(express.json());
app.use(cors({
    origin: CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin']
}));

app.post("/api/auth/wallet", (req, res) => walletAuthHandler(req, res));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});