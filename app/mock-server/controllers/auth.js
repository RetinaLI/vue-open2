let fs = require('fs');
let path = require('path');

module.exports = {
  getAuth () {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../json/real-auth.json')));
  },
  postAuth () {
    return {
      code: 1,
      msg: 'success'
    };
  },
  postImg () {
    return {
      success: true,
      info: '上传成功',
      fileBeans: [{
        filename: 'lkjsdlkf.jpg',
        fileSize: '1231213',
        filePath: 'http://localhost:8081/public/img/identify.png',
        newFileName: 'kjsldkjgldsjflkdsjf.jpg'
      }]
    };
  }
};
