var BBPromise = require('bluebird');
var bower = require('bower');
var del = require('del');
var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var mainBowerFiles = require('main-bower-files');

gulp.task('install', function () {
  return new BBPromise(function (resolve, reject) {
    bower.commands.install().on('log', function (log) {
      gutil.log('bower', log.id.cyan, log.message);
    }).on('end', function (installed) {
      resolve(installed);
    }).on('error', function (err) {
      reject(err);
    });
  });
});

gulp.task('bower', ['install'], function () {
  var destPath = 'public/lib';
  del.sync(destPath);
  return gulp.src(mainBowerFiles(), { base: 'bower_components' })
  .pipe(gulp.dest(destPath));
});

gulp.task('jshint', function () {
  return gulp.src(['api.js', 'app.js', 'gulpfile.js', 'twtw.js', 'bin/www', 'routes/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(jshint.reporter('fail'));
});

gulp.task('test', ['jshint']);
gulp.task('build', ['bower']);
gulp.task('default', ['build']);
