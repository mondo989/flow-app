#!/bin/sh
rm -rf ./FlowApp-darwin-x64/
electron-packager --platform=darwin --arch=x64 --version=0.30.1 ../flow-client/ FlowApp
cp f-logo.icns FlowApp-darwin-x64/FlowApp.app/Contents/Resources/atom.icns
hdiutil create -volname FlowApp -srcfolder ./FlowApp-darwin-x64/ -ov -format UDZO -size 512m ./FlowApp-darwin-x64/flowapp.dmg
