import Vue from 'vue';

Vue.config.productionTip = false;
// 加载所有的测试用例、 testsContext.keys().forEach(testsContext)
// 这种写法是webpack中的加载目录下所有文件的写法
// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/);
testsContext.keys().forEach(testsContext);

// require all src files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
// 加载所有代码文件，方便统计代码覆盖率
// const srcContext = require.context('../../src', true, /^\.\/(?!main(\.js)?$)/);
// const srcContext = require.context('../../src', true, /^\.\/(?![main(\.js)|(\.html)])?$/);
const srcContext = require.context('../../src', true, /\.vue$/);
srcContext.keys().forEach(srcContext);
