# SillyTavern Push Notifications

Allows to receive push notifications for incoming chat messages.

No Extra APIs, no configs, just works™.

## Doesn't work?

Okay, maybe it wasn't that simple.

![image](https://github.com/Cohee1207/SillyTavern-PushNotifications/assets/18619528/f6cd4c6a-76ad-4197-ac3e-a4d7d9322d54)

### Check for browser and system permissions

1. Chrome: https://knowledge.workspace.google.com/kb/how-to-enable-browser-notifications-000007831
2. Firefox: https://support.mozilla.org/en-US/kb/push-notifications-firefox

### Configure SSL

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
