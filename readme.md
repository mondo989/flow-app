# Flow app

** Start client
`> cd flow-client && npm start

============================================
# Flow server

Site: tryflow.io

Test server locally:
`> cd flow-server && ssh -L 27017:127.0.0.1:27017 -i ./config/elasticsearch-ec2.pem ec2-user@tryflow.io

Open another terminal, and:
`> cd flow-server && node flowserver.js

Then open your browser at http://127.200.0.10:1337/

============================================
# Installer code

** Installer on Mac:

```
> npm install electron-packager -g
> cd flow-installer
> ./build-maxosx.sh
```

This will build the full app into flow-installer/FlowApp-darwin-x64

** Installer on Windows

```
> npm install electron-packager -g
> cd flow-installer
> ./build-windows.bat
```

** Uploading an install:
`> node upload.js

This will automatically figure out the platform, and upload the generated setup

