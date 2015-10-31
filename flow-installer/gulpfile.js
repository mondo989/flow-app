var gulp = require('gulp');
var winInstaller = require('electron-windows-installer');

gulp.task('create-windows-installer', function(done) {
  winInstaller({
    appDirectory: './FlowApp-win32-x64',
    outputDirectory: './release',
    authors : "Armando Flores",
    description : "Flow app",
    iconUrl : "https://tryflow.io/img/f-logo.png",
    exe : "FlowApp.exe",
    setupExe : "FlowSetup.exe"
  }).then(done).catch(done);
});
