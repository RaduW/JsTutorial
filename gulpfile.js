"use strict";
/**
 * Created by raduw on 20.04.2015.
 */

var gulp = require('gulp'),
    path = require('path'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    tsCompiler = require('gulp-typescript'),
    bower = require('gulp-bower2'),
    mainBowerFiles = require('main-bower-files'),
    merge = require('merge2'),
    chmod = require('gulp-chmod'),
    tsd = require('gulp-tsd'),
    karma = require('karma'),
    del = require('del'),
    gutil = require('gulp-util'),
    karmaParseConfig = require('karma/lib/config').parseConfig;


var baseDir = './src/';

gulp.task('default', ['typescript'], function () {
    console.log("running the defaultTask with it's dependencies");
});

gulp.task('less', function () {
    console.log("building css from less files");
    return gulp.src(baseDir + 'less/**/*.less')
        .pipe(less({
            paths: [path.join(baseDir, 'less')]
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest(baseDir +'css'))
        .pipe(minifyCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(baseDir +'css'));
});

gulp.task('typescript', function () {
    console.log("transpiling typescript files to js");
     del([                              //deleted generated file since they are readonly and can't be overriden
         baseDir +'js/**/*.js',
         '!'+baseDir +'js/require.js',   // do NOT delete config.js since this is not generated
         '!'+baseDir +'js/config.js'   // do NOT delete config.js since this is not generated
     ]);

    return gulp.src( baseDir +'typescript/**/*.ts').
        pipe(tsCompiler({
            target: 'ES5',
            module: 'amd'
        }))
        .pipe(chmod(444))               //make generated files read only
        .pipe(gulp.dest(baseDir +'js'));

});

gulp.task('tsd', function(){
    console.log("fetching the typescript definition files (listed in t)");

});

// fetches all bower dependencies (from bower.json)
gulp.task('bower', function(){
    console.log("fetching bower dependencies (listed in bower.json)");
    bower()
        .pipe(gulp.dest('bower_components/'));

    return gulp.src(mainBowerFiles(),{base: './bower_components'})
        .pipe(gulp.dest(baseDir +'lib/'))

});

gulp.task('copyDirectiveTemplates', function () {
    del(baseDir +'js/**/*.html');   //deleted generated file since they are readonly and can't be overriden

    return gulp.src( baseDir +'typescript/**/*.html')
        .pipe(chmod(444))            // make generated files readonly
        .pipe(gulp.dest(baseDir +'js'));

});


gulp.task('dependencies', ['tsd','bower'],function () {
    console.log("fetching all dependencies");
});



function runKarma(configFilePath, options, cb) {

	configFilePath = path.resolve(configFilePath);

	var server = karma.server;
	var log=gutil.log, colors=gutil.colors;
	var config = karmaParseConfig(configFilePath, {});

    Object.keys(options).forEach(function(key) {
      config[key] = options[key];
    });

	server.start(config, function(exitCode) {
		log('Karma has exited with ' + colors.red(exitCode));
		cb();
		process.exit(exitCode);
	});
}

/** actual tasks */

/** single run */
gulp.task('test', function(cb) {
	runKarma('karma.conf.js', {
		autoWatch: false,
		singleRun: true
	}, cb);
});

/** continuous ... using karma to watch (feel free to circumvent that;) */
gulp.task('test-watch', function(cb) {
	runKarma('karma.conf.js', {
		autoWatch: true,
		singleRun: false
	}, cb);
});

gulp.task('watch', function () {
    gulp.watch(baseDir + 'typescript/**/*.ts', ['typescript']);
    gulp.watch(baseDir + 'typescript/**/*.html', ['copyDirectiveTemplates'])
    gulp.watch(baseDir + 'less/**/*.less', ['less'])
});
