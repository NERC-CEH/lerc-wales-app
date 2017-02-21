const webpack = require('webpack');
const ENV = process.env.NODE_ENV || process.env.ENV || 'testing';

// get development webpack config
const webpackConfigDev = require('../config/webpack.dev');
// clean it up a bit
delete webpackConfigDev.context;
delete webpackConfigDev.entry; // the entry is the loader
delete webpackConfigDev.output; // no need to output files
webpackConfigDev.plugins.splice(1, 2); // temp remove of clashing plugins
webpackConfigDev.plugins.splice(0, 0, new webpack.DefinePlugin({
  'process.env': {
    ENV: JSON.stringify(ENV),
  },
}));

module.exports = (config) => {
  config.set({
    // basePath: './',

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    frameworks: ['mocha', 'chai', 'sinon'],

    files: [
      { pattern: 'mocks.js', watched: false },
      { pattern: 'loader.js', watched: true },
    ],

    preprocessors: {
      'loader.js': ['webpack'],
    },

    webpack: webpackConfigDev,

    webpackServer: {
      noInfo: true,
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      stats: {
        // minimal logging
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false,
        children: false,
      },
    },
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,
  });
};
