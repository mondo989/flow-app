# Flow app by armando

Start client
```
> cd flow-client && electron .
```
============================================
# Flow server

Site: tryflow.io

Test server locally:
```
> cd flow-server && ssh -L 27017:127.0.0.1:27017  -L 9200:127.0.0.1:9200 -i ./config/elasticsearch-ec2.pem ec2-user@tryflow.io
```
This will open a reverse tunnel from the server's MongoDB, and Elastic Search services, and makes them available locally.
Next, open another terminal, and:
```
> cd flow-server && node flowserver.js
```
Then open your browser at http://127.200.0.10:1337/

============================================
# Installer code

** Installer on Mac:

```
> npm install electron-packager -g
> cd flow-installer
> ./build-macosx.sh
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

============================================
# API docs:

* /api/login

authenticates a user; parameters: email & code

* /api/search

Search for assets; parameters are:
* code : user authentication code
* tags : array of tags to be searched for
* author : display only results from author


to view log files in server:
run: forever list
get file path
run: tail -f file_path

to restart server go into www/flow.io and rerun redploy.sh
run: ./redploy.sh start

My server's down again.
