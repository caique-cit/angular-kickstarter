/* jshint node: true, -W024, -W040, -W098, -W126 */

'use strict';

var $ = require('gulp-load-plugins')({lazy: true}),
    src = './src/';

module.exports = {

    // --- Configurables ---
    name: 'Angular Kic-start',
    sourceDir: src,
    testDir: './test/',
    buildDir: './build/',
    tempDir: './.tmp/',
    js: [
        // module files in desired order
        src + '**/*.module.js',

        // remaining files in desired order
        src + 'core/**/*.js',
        src + 'framework/**/*.js',
        src + '**/*.js'
    ],
    html: src + '**/*.html',
    sass: src + '**/*.scss',
    $: $,
    args: require('yargs').argv,
    languages: ['en', 'pt'],
    i18nFolder:'i18n',
    // --- Utilities ---
    log: function log(msg) {
        if (typeof(msg) === 'object') {
            for (var item in msg) {
                if (msg.hasOwnProperty(item)) {
                    $.util.log($.util.colors.blue(msg[item]));
                }
            }
        } else {
            $.util.log($.util.colors.blue(msg));
        }
    },
    notify: function notify(msg) {
        var notifier = require('node-notifier');
        var options = {};

        if (typeof msg === 'string') {

            options = {
                message: msg,
                title: this.name,
                sound: true,// Only Notification Center or Windows Toasters
            };
        }

        notifier.notify(options);
    }

};
