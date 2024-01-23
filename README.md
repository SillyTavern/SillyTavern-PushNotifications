# SillyTavern Push Notifications

Allows to recieve push notifications for incoming chat messages. 

No Extra APIs, no configs, just works™.

## HTTPS IS REQUIRED!

It won't work without SSL certificate set up, even on localhost.

Below is a simple guide on how to generate and use self-signed certificates.

1. Generate a certificate and key (requires to have `openssl` installed on your system)

```bash
openssl req -x509 -out localhost.crt -keyout localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```

2. Put them in some folder accessible to SillyTavern server (dist, for example).

3. Start SillyTavern server with appropriate SSL console flags (provide paths to your actual key/cert).

```bash
node server.js --ssl --certPath dist/localhost.crt --keyPath dist/localhost.key   
```

4. Use `https://localhost:8000` to access your SillyTavern instance.
