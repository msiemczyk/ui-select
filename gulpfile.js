let fs = require('fs');
let del = require('del');
let gulp = require('gulp');
let streamqueue = require('streamqueue');
let KarmaServer = require('karma').Server;
let $ = require('gulp-load-plugins')();
let conventionalRecommendedBump = require('conventional-recommended-bump');
let titleCase = require('title-case');

const config = {
  pkg : JSON.parse(fs.readFileSync('./package.json')),
  banner:
      '/*!\n' +
      ' * <%= pkg.name %>\n' +
      ' * <%= pkg.homepage %>\n' +
      ' * Version: <%= pkg.version %> - <%= timestamp %>\n' +
      ' * License: <%= pkg.license %>\n' +
      ' */\n\n\n'
};

function cleanTask() {
  return del(['dist', 'temp']);
}

function scriptsTask() {
  let buildTemplates = function () {
    const pathSeparator = require('path').sep;

    return gulp.src('src/**/*.html')
      .pipe($.minifyHtml({
             empty: true,
             spare: true,
             quotes: true
            }))
      .pipe($.angularTemplatecache({
        module: 'ui.select',
        transformUrl: (url) => url.replace(pathSeparator, '')}));
  };

  let buildLib = function(){
    return gulp.src(['src/common.js','src/*.js'])
      .pipe($.plumber({
        errorHandler: handleError
      }))
      .pipe($.concat('select_without_templates.js'))
      .pipe($.header('(function () { \n"use strict";\n'))
      .pipe($.footer('\n}());'))
      .pipe(gulp.dest('temp'))
      .pipe($.jshint())
      .pipe($.jshint.reporter('jshint-stylish'))
      .pipe($.jshint.reporter('fail'));
  };

  return streamqueue({objectMode: true }, buildLib(), buildTemplates())
    .pipe($.plumber({
      errorHandler: handleError
    }))
    .pipe($.concat('select.js'))
    .pipe($.header(config.banner, {
      timestamp: (new Date()).toISOString(), pkg: config.pkg
    }))
    .pipe(gulp.dest('dist'))
    .pipe($.sourcemaps.init())
    .pipe($.uglify({preserveComments: 'some'}))
    .pipe($.concat('select.min.js'))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
}

function stylesTask() {
  return gulp.src(['src/common.css'], {base: 'src'})
    .pipe($.sourcemaps.init())
    .pipe($.header(config.banner, {
      timestamp: (new Date()).toISOString(), pkg: config.pkg
    }))
    .pipe($.concat('select.css'))
    .pipe(gulp.dest('dist'))
    .pipe($.minifyCss())
    .pipe($.concat('select.min.css'))
    .pipe($.sourcemaps.write('../dist', {debug: true}))
    .pipe(gulp.dest('dist'));
}

function karmaTask(cb) {
  new KarmaServer({configFile : __dirname +'/karma.conf.js', singleRun: true}, cb).start();
}

function karmaWatchTask(cb) {
  gulp.watch(['src/**/*.{js,html}'], gulp.series(['build']));

  new KarmaServer({configFile : __dirname +'/karma.conf.js', singleRun: false}, cb).start();
}

function cleanDocsTask() {
  return del(['docs-built']);
}

function docsAssetsTask() {
  gulp.src('./dist/*').pipe(gulp.dest('./docs-built/dist'));
  return gulp.src('docs/assets/*').pipe(gulp.dest('./docs-built/assets'));
}

function docsExamplesTask() {
  // Need a way to reset filename list: $.filenames('exampleFiles',{overrideMode:true});
  return gulp.src(['docs/examples/*.html'])
    .pipe($.header(fs.readFileSync('docs/partials/_header.html')))
    .pipe($.footer(fs.readFileSync('docs/partials/_footer.html')))
    .pipe($.filenames('exampleFiles'))
    .pipe(gulp.dest('./docs-built/'));
}

function docsIndexTask() {
  let exampleFiles = $.filenames.get('exampleFiles');
  exampleFiles = exampleFiles.map(function (filename) {
    let cleaned = titleCase(filename.replace('demo-', '').replace('.html', ''));
    return '<h4><a href="./' + filename + '">' + cleaned + '</a> <plnkr-opener example-path="' + filename + '"></plnkr-opener></h4>';
  });

  return gulp.src('docs/index.html')
    .pipe($.replace('<!-- INSERT EXAMPLES HERE -->', exampleFiles.join("\n")))
    .pipe(gulp.dest('./docs-built/'));
}

let build = gulp.series(cleanTask, gulp.parallel(scriptsTask, stylesTask));

exports.default = gulp.series(build, karmaTask);
exports.clean = cleanTask;
exports.scripts = gulp.series(cleanTask, scriptsTask);
exports.styles = gulp.series(cleanTask, stylesTask);
exports.build = build;
exports.test = gulp.series(build, karmaTask);
exports.watch = gulp.series(build, karmaWatchTask);
exports['docs:clean'] = cleanDocsTask;
exports.docs = gulp.series(cleanDocsTask, gulp.parallel(docsAssetsTask, docsExamplesTask), docsIndexTask);

gulp.task('pull', function(done) {
  $.git.pull();
  done();
});

gulp.task('add', function(done) {
  $.git.add();
  done();
});

gulp.task('recommendedBump', function(done) {
  /**
   * Bumping version number and tagging the repository with it.
   * Please read http://semver.org/
   *
   * To bump the version numbers accordingly after you did a patch,
   * introduced a feature or made a backwards-incompatible release.
   */

  conventionalRecommendedBump({preset: 'angular'}, function(err, importance) {
    // Get all the files to bump version in
    gulp.src(['./package.json'])
      .pipe($.bump({type: importance}))
      .pipe(gulp.dest('./'));

    done();
  });
});

gulp.task('changelog', function() {
  return gulp.src('CHANGELOG.md')
    .pipe($.conventionalChangelog({preset: 'angular'}))
    .pipe(gulp.dest('./'));
});

gulp.task('push', function(done) {
  $.git.push('origin', 'master', {args: '--follow-tags'});
  done();
});

gulp.task('commit', function() {
  return gulp.src('./')
    .pipe($.git.commit('chore(release): bump package version and update changelog', {emitData: true}))
    .on('data', function(data) {
      console.log(data);
    });
});

gulp.task('tag', function() {
  return gulp.src('package.json')
    .pipe($.tagVersion());
});

gulp.task('bump', gulp.series('recommendedBump', 'changelog', 'add', 'commit', 'tag', 'push'));

gulp.task('docs:watch', gulp.series([exports.docs], function() {
  gulp.watch(['docs/**/*.{js,html}'], gulp.series([exports.docs]));
}));

let handleError = function (err) {
  console.log(err.toString());
  this.emit('end');
};
