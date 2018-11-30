let path = require('path');

module.exports = {
  root: (cPath) => {
    let rootPath = '../../';
    return path.resolve(rootPath, cPath);
  }
};