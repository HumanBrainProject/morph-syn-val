var gulp = require('gulp');
var browserSync = require('browser-sync');

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve', ['build'], function(done) {
  browserSync({
    online: false,
    open: false,
    port: 9000,
    server: {
      baseDir: ['.'],
      routes: {
        '/morph-syn-val': '.'
      },
      middleware: function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    },
    https: {
        key:  process.env.HOME + '/.ssl/server.key',
        cert: process.env.HOME + '/.ssl/server.crt'
    }
  }, done);
});

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve-bundle', ['bundle'], function(done) {
  browserSync({
    online: false,
    open: false,
    port: 9000,
    server: {
      baseDir: ['.'],
      routes: {
        '/morph-syn-val': '.'
      },
      middleware: function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    },
    https: {
        key:  process.env.HOME + '/.ssl/server.key',
        cert: process.env.HOME + '/.ssl/server.crt'
    }
  }, done);
});

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve-export', ['export'], function(done) {
  browserSync({
    online: false,
    open: false,
    port: 9000,
    server: {
      baseDir: ['./export'],
      routes: {
        '/morph-syn-val': '.'
      },
      middleware: function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    },
    https: {
        key:  process.env.HOME + '/.ssl/server.key',
        cert: process.env.HOME + '/.ssl/server.crt'
    }
  }, done);
});
