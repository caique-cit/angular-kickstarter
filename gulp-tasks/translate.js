'use strict';

var gulp = require('gulp');
var merge = require('gulp-merge-json');
var es = require('event-stream');

module.exports = function(config) {

  var log = config.log;

  gulp.task('translate', ['clean-translate'], function() {

    return es.merge(config.languages.map(function(lang) {

      log(config.$.util.colors.blue('Merging translate: ' + lang));

      var sourceFiles = [
        config.sourceDir + '/**/' + config.i18nFolder + '/*' +
        lang + '.json',
      ];

      return gulp.src(sourceFiles)
        .pipe(config.$.plumber())
        .pipe(merge({
          fileName: 'i18n/locale-' + lang + '.json'
        }))
        .pipe(gulp.dest(config.tempDir))
        .pipe(gulp.dest(config.buildDir));
    }));

  });

};
