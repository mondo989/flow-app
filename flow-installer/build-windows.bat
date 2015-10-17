@echo off
rm -rf package
mkdir package
mkdir package\resources
echo "Building .asar file...";
node node_modules\electron-windows-installer\node_modules\asar\bin\asar pack ..\flow-client package\resources\app.asar
echo "Building electron...";
electron-packager --platform=win32 --arch=x64 --version=0.30.1 --overwrite ../flow-client/ FlowApp

echo "Building installer..."
gulp create-windows-installer

