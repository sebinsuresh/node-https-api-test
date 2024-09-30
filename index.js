const https = require("https");
const fs = require("fs");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
    console.log(`Request received from ${req.ip}`);
    res.send("Hello World!");
});

const httpsOptions = {
    key: fs.readFileSync("./data/dotnet.key"),
    cert: fs.readFileSync("./data/dotnet.pem"),
};

https
    .createServer(httpsOptions, app)
    .listen(5000, () => {
        console.log("Server is running on port 5000");
    });

/*
Getting signed certs:

1. Use dotnet dev-certs

```sh
dotnet dev-certs https --export-path ./data/dotnet.pem --no-password --format pem -v
```
OR

```sh
dotnet dev-certs https --export-path ./data/dotnet.pfx -p 123456 --format pem -v
```

With pfx you need passphrase

2. Use openssl

```sh
openssl genrsa -out ./data/key.pem

# git bash specific
MSYS_NO_PATHCONV=1 openssl req -new -key ./data/key.pem -subj "/CN=localhost" -out ./data/csr.pem

openssl x509 -req -days 1 -in ./data/csr.pem -signkey ./data/key.pem -out ./data/cert.pem
```
 */