#!/bin/sh
rm -rf ./FlowApp-darwin-x64/
electron-packager --platform=darwin --arch=x64 --version=0.34.0 ../flow-client/ FlowApp
cp f-logo.icns FlowApp-darwin-x64/FlowApp.app/Contents/Resources/atom.icns

