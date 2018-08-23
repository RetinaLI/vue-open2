let requires = require('../lib/requires');
let path = require('path');
let map = {};
let modules = requires(path.join(__dirname), 'index.js');

modules.forEach(element => {
  map[element.f.split('.')[0]] = element.m;
});

module.exports = map;
