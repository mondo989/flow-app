@echo off
mkdir package
mkdir package\resources
echo "Building .asar file...";
asar pack ..\flow-client package\resources\app.asar
echo "Building installer..."
gulp create-windows-installer

