const https = require("https");
const fs = require("fs");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
    console.log(`Request received from ${req.ip}`);
    res.send("Hello World!");
});

const httpsOptions = {
    key: fs.readFileSync("./data/device.key"),
    cert: fs.readFileSync("./data/device.cert"),
};

https
    .createServer(httpsOptions, app)
    .listen(5000, () => {
        console.log("Server is running on port 5000");
    });
