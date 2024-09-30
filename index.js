const https = require("https");
const fs = require("fs");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const httpsOptions = {
    key: fs.readFileSync("./data/key.pem"),
    cert: fs.readFileSync("./data/cert.pem"),
};

https
    .createServer(httpsOptions, app)
    .listen(5000, () => {
        console.log("Server is running on port 5000");
    });

