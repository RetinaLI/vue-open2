// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack

var webpackConfig = require('../../build/webpack.test.conf');

module.exports = function karmaConfig (config) {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    browsers: ['Chrome'], // 增加chrome需要npm i -> karma-chrome-launcher插件;
    // browsers: ['PhantomJS'], // 在几个环境里跑你的测试用例?为什么不使用PhantomJS, 因为经常莫名的错误
    frameworks: ['mocha', 'sinon-chai', 'phantomjs-shim'], // 默认加载几个框架
    reporters: ['spec', 'coverage', 'progress'], // 使用那些汇报框架
    files: ['./index.js'], // 预加载文件
    preprocessors: { // 预处理
      './index.js': ['webpack', 'sourcemap']
    },
    colors: true,
    webpack: webpackConfig, // webpack 配置
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: { // coverage 配置
      dir: './coverage',
      reporters: [
        {type: 'lcov', subdir: '.'},
        {type: 'text-summary'}
      ]
    }
  });
};
