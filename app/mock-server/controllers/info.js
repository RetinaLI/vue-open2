let fs = require('fs');
let path = require('path');

module.exports = {
  getInfo () {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../json/info.json')));
  },
  getInfoCode () {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../json/info-email.json')));
  },
  getInfoToken () {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../json/info-token.json')));
  },
  postEmail () {
    return {
      code: 1,
      msg: 'success'
    };
  },
  postOldCode () {
    return {
      code: 1,
      msg: 'success'
    };
  },
  postNewCode () {
    return {
      content: '操作成功-content',
      type: 'success'
    };
  },
  postName () {
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
  },
  modifyAvatar () {
    return {
      code: 1,
      msg: 'success'
    };
  }
};
