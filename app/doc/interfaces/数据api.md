**注： 各字段名称用汉字表示，请替换成对应英文字段**
**注： 竖线(|)表示或**
**作者： 孙国元**
# 1. 前台页面--数据api

## 1.1 搜索结果--获取数据列表

  ```
    params: {
      '搜索关键字': '',   // 可选
      '数据类型': '车辆运行数据' | '车辆数据分析' | '车主服务数据',
      '页码': 1 ,
      '每页数据个数': 12
    return: {
      count: 200,   // 总数据条数，用于分页
      data: [
        {
          'id': 1,
          '名称': '车辆实时位置',
          '摘要': '获取当前车辆的实时位置和海拔等信息，精准定位车辆位置服务',
          '价格': 0.01,   // 单位：元/次
          '状态': '未开通' | '申请中' | '已开通',
          '接口地址': 'http://abc.com/def'
        },...
      ]
    }
  ```

## 1.2 数据详情--获取接口详细信息

  ```
    params: {
      'id': 123
    }
    return: {
      data: {
        'id': 123,
        '接口名称': '名称1',
        '详情': '*******',    // markdown 字符串
        '价格': 0.01,    // 单位：元/次
        '月上限': 2000,    // 元
        '状态': '未开通' | '申请中' | '已开通'
      }
    }
  ```

## 1.3 申请数据--发送接口申请的请求

  ```
    params: {
      'id': 1
    }
    return: {
      data: {
        msg: '成功',
        type: 'true' | 'false'
      }
    }
  ```
## 1.4 数据服务--获取数据接口类型
  ```
    params: {}
    return: [
      {
        id: 1,
        name: 'abc'
      },
      ...
    ]
  ```
# 2.前台页面--产品&行业动态

## 2.1 行业动态页面--获取行业动态列表

  ```
    params: {
      '页码': 1,
      '每页显示个数': 9
    }
    return: {
      count: 200,   // 总数据条数，用于分页
      data: [
        {
          'id': 1
          '标题': '三位车手上阵 蔚来车队纽约...',
          '时间': '2018-07-24',
          '链接': '******',
          '图片': '******'
        }, ...
      ]
    }
  ```

## 2.2 产品动态页面--获取产品动态列表

  ```
    params: {
      '页码': 1,
      '每页显示个数': 9
    }
    return: {
      count: 200,     // 总数据条数，用于分页
      data: [
        {
          'id': 1
          '标题': '数据开放平台V1.2版本',
          '详情': '',    // markdown 格式字符串
          '时间': '2018-07-24',
          '链接': '*******'
        }, ...
      ]
    }
  ```

# 3. 控制台页面--我的数据

## 3.1 我的数据页面--获取用户已购买的接口列表
  ```
    params: {
      '页码': 1,
      '每页显示个数': 9
    }
    return: {
      count: 200,   // 总数据条数，用于分页
      data: [
        {
          'id': 1,
          '接口名称': '名称1'
          '接口地址': 'abc.com.cn',
          '单价': 0.01,   // 单位: 元/次
          '已调用次数': 122,    // 单位: 元
          '已消费金额': 1.22    // 单位: 元
        }
      ]
    }
  ```

## 3.2 数据详情页面--获取某个接口的使用详情

  ```
    params: {
      id: 1
    }
    return: {
      '调用总次数': 2000,   // 单位: 次
      '消费总金额': 500,    // 单位: 元
      '昨日调用次数': 20,   // 单位: 次
      '昨日消费金额': 5     // 单位: 元
    }
  ```

## 3.3 数据详情页面--获取某个接口 一周内的调用走势

```
  params: {
    id: 1
  }
  return: [
    {
      '日期': '2018-7-23',
      '调用次数': 98,
      '消费金额': 300
    }, ...
  ]
```

## 3.4 数据申请页面--查看所有数据（可按分类查看和按状态查看）

```
  params: {
    '页码': 1,
    '每页显示个数': 9,
    '类别': '全部' | '车辆运行数据' | '车辆数据分析' | '车主服务数据',
    '状态': '全部' | '未开通' | '申请中' | '已开通'
  }
  return: {
    count: 200,     // 总数据条数，用于分页
    data: [
      {
        'id': 1,
        '名称': '车辆实时位置',
        '摘要': '获取当前车辆的实时位置和海拔等信息，精准定位车辆位置服务',
        '价格': 0.01,   // 单位：元/次
        '接口地址': 'http://abc.com/def'
      }
    ]
  }
```
