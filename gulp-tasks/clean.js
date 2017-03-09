'use strict';

var del = require('del');
var gulp = require('gulp');

module.exports = function (config) {

    gulp.task('clean', function () {
        var delconfig = [].concat(config.buildDir, './.sass-cache/', config.tempDir, './report/');

        config.log('Cleaning: ' + config.$.util.colors.blue(delconfig));

        return del(delconfig);
    });

    gulp.task('clean-fonts', function () {
        return clean(config.buildDir + 'fonts/**/*.*');
    });

    gulp.task('clean-translate', function () {
        var files = [].concat(
            config.tempDir + 'i18n/**/*.*',
            config.buildDir + 'i18n/**/*.*'
        );
        return clean(files);
    });

    gulp.task('clean-images', function () {
        return clean(config.buildDir + 'images/**/*.*');
    });

    gulp.task('clean-code', function () {
        var files = [].concat(
            config.tempDir + '**/*.js',
            config.tempDir + '**/*.json',
            config.buildDir + '**/*.js',
            config.buildDir + '**/*.html',
            config.buildDir + '**/*.json'
        );

        return clean(files);
    });

    gulp.task('clean-styles', function () {
        var files = [].concat(
            config.tempDir + '**/*.css',
            config.buildDir + '**/*.css'
        );

        return clean(files);
    });

    function clean(path) {
        config.log('Cleaning: ' + config.$.util.colors.blue(path));
        return del(path);
    }


};

