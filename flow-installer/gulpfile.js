var gulp = require('gulp');
var winInstaller = require('electron-windows-installer');

gulp.task('create-windows-installer', function(done) {
  winInstaller({
    appDirectory: './package',
    outputDirectory: './release',
    authors : "Armando Flores",
    description : "Flow app",
    iconUrl : "https://tryflow.io/img/f-logo.png",
    exe : "electron.exe"
  }).then(done).catch(done);
});
