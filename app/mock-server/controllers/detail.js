let fs = require('fs');
let path = require('path');

module.exports = {
  getDetail () {
    return JSON.parse(
      fs.readFileSync(path.join(__dirname, '../json/detail.json')));
  },
  getDetailChart () {
    return JSON.parse(
      fs.readFileSync(path.join(__dirname, '../json/detail-chart.json')));
  },
  getDetailMonth () {
    return {
      code: 1,
      msg: 'success',
      data: {
        totalCount: 20,
        list: [
          {
            usercount: 20,
            allmoney: 0.9,
            time: '2018-07'
          },
          {
            usercount: 20,
            allmoney: 0.9,
            time: '2018-06'
          },
          {
            usercount: 20,
            allmoney: 0.9,
            time: '2018-05'
          },
          {
            usercount: 20,
            allmoney: 0.9,
            time: '2018-04'
          },
          {
            usercount: 20,
            allmoney: 0.9,
            time: '2018-03'
          },
          {
            usercount: 20,
            allmoney: 0.9,
            time: '2018-02'
          },
          {
            usercount: 20,
            allmoney: 0.9,
            time: '2018-01'
          }
        ]
      }
    };
  },
  getDetailDay () {
    return {
      code: 1,
      msg: 'success',
      data: {
        totalCount: 20,
        list: [
          {
            usercount: 20,
            allmoney: 0.9,
            time: '2018-09-29'
          },
          {
            usercount: 20,
            allmoney: 0.9,
            time: '2018-09-29'
          },
          {
            usercount: 20,
            allmoney: 0.9,
            time: '2018-09-29'
          },
          {
            usercount: 20,
            allmoney: 0.9,
            time: '2018-09-29'
          },
          {
            usercount: 20,
            allmoney: 0.9,
            time: '2018-09-29'
          },
          {
            usercount: 20,
            allmoney: 0.9,
            time: '2018-09-29'
          },
          {
            usercount: 20,
            allmoney: 0.9,
            time: '2018-09-29'
          }
        ]
      }
    };
  },
  getDetailTable () {
    return JSON.parse(
      fs.readFileSync(path.join(__dirname, '../json/detail-table.json')));
  },
  getCarList () {
    return JSON.parse(
      fs.readFileSync(path.join(__dirname, '../json/car-list.json')));
  },
  submitFile () {
    return {
      apiResponse: {
        data: {
          success: 0,
          msg: '导入第【7】行数据开始\n\n\n\n导入第【7】行数据的车辆已被录入，不能进行导入\n导入第【7】行数据失败\n\n导入第【8】行数据开始\n\n导入第【8】行数据的车辆已被录入，不能进行导入\n导入第【8】行数据失败\n\n\n共上传成功【0】条记录',
          fail: 5,
          count: 5
        },
        code: 1,
        msg: '操作完毕'
      }
    };
  }
};
