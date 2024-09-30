## about

Exploring https w node & express

## running

Setup certs in `./data/`, then:

```sh
npm i
npm start
```

### Getting signed certs

1. Use dotnet dev-certs

```sh
dotnet dev-certs https --export-path ./data/dotnet.pem --no-password --format pem -v
```
OR

```sh
dotnet dev-certs https --export-path ./data/dotnet.pfx -p 123456 --format pem -v
```

With pfx you need to provide passphrase to node https

2. Use openssl

From https://stackoverflow.com/questions/7580508/getting-chrome-to-accept-self-signed-localhost-certificate

Create ./data/v3.ext with:

```ext
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
IP.1 = 192.168.0.137
IP.2 = 127.0.0.1
```

Generate certs:

```sh
openssl genrsa -out ./data/rootCA.key 4096
openssl req -x509 -new -nodes -key ./data/rootCA.key -newkey rsa:4096 -sha256 -days 1024 -out ./data/rootCA.pem

openssl req -new -newkey rsa:4096 -sha256 -nodes -keyout ./data/device.key -out ./data/device.csr
openssl x509 -req -in ./data/device.csr -CA ./data/rootCA.pem -CAkey ./data/rootCA.key -CAcreateserial -out ./data/device.crt -days 2000 -sha256 -extfile ./data/v3.ext
```

Add `rootCA.pem` to Windows' trusted root certificates.
Use `device.key` and `device.crt` in node app.

- Used Git Bash on Windows and `/mingw64/bin/openssl` that came with it
