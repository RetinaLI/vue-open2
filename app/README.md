# openapi-website

> openapi website for itink

## 数据开放平台

### 目录：简单说明
```
  app
    build
    config
    doc
      // markdown文档：用于写说明或者接口文档
    mock-server
      // 模拟 - http数据请求服务
    src
      assets
        // 公用文件：js、img、css
      components
        // 组件
        console -> 控制台组件
        dynamicIndustry
        dynamicProducts
        example
        navbg
        ...vue
      config
      http
        // 用于http请求
        axiosApi.js -> 主要调用
        getApi.js   -> 辅助get（可不用）
        http.js     -> axios拦截器
        http.url.config.js -> 用于配置请求参数辅助于axiosApi.js
        postApi.js  -> 辅助post（可不用）
      lib
        // 公用js文件
      pages
        // 每一个单独的组件即是（抽象出）的一个页面
      router
        // 路由配置
      services
        // 实现http调用的地方
      stores
        // vuex全局变量或状态管理器
      views
        // 1.引入pages内部页面组件，用于router路由引入
        // 2.用于懒加载
      App.vue
      main.js -> 入口文件
    static
    index.html
    package.json
```

## Build Setup


``` bash
# install dependencies 安装包依赖
npm install

# serve with hot reload at localhost:9001
npm run dev  # 开发环境
npm run mock # 模拟数据服务

# build for production with minification
npm run build # 生产打包

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```


## 发布

  + 在该工程目录打开git bash或者在vscode中启动终端（保证终端是bash环境，具体设置见iov-web-mobile/README.md）
  + 发布到200： `bash deploy.sh 200`，执行完成后会要求输入密码，输入`foton[zk]`，回车即可发布到200，具体请注意控制台提示。
  + 发布到生产工程：`bash deploy.sh`，执行完成后会自动提交到`iov-web-api`工程，具体请注意控制台提示。

## 单元测试

### unit
+ [vue: 测试文档](https://vue-test-utils.vuejs.org/zh/guides/)
+ 涉及到的一些开源项目

```unit tests项目: karma作为测试执行过程管理工具把Mocha、sinon-chai、phantomjs等框架组织起来。Mocha用来描述测试用例、sinon-chai用来断言、然后使用phamtomjs作为运行环境来跑测试用例。```
1. karma
`Karma是一个基于Node.js的JavaScript测试执行过程管理工具（Test Runner）。该工具可用于测试所有主流Web浏览器，也可集成到CI（Continuous integration）工具，也可和其他代码编辑器一起使用。这个测试工具的一个强大特性就是，它可以监控(Watch)文件的变化，然后自行执行，通过console.log显示测试结果。`

2. Mocha
`mocha是一款功能丰富的javascript单元测试框架，它既可以运行在nodejs环境中，也可以运行在浏览器环境中。`

3. Nightwatch
`Nightwatch是一套基于Node.js的测试框架，使用Selenium WebDriver API以将Web应用测试自动化。它提供了简单的语法，支持使用JavaScript和CSS选择器，来编写运行在Selenium服务器上的端到端测试。`

4. phantomjs
`一个基于webkit内核的无头浏览器，即没有UI界面，即它就是一个浏览器，只是其内的点击、翻页等人为相关操作需要程序设计实现。`

5. sinon-chai
`sinon-chai是 sinon和chai这两个断言库的结合，提供丰富的断言方法 `

6. karma-coverage[文档](https://www.zybuluo.com/wangxingkang/note/790416)
###### 生成代码覆盖率[覆盖率介绍](https://blog.hypers.io/2017/08/20/test-coverage/)
+ statements:语句覆盖率,执行到每个语句；
+ branches:分支覆盖率，执行到每个if代码块；
+ lines:行覆盖率, 执行到程序中的每一行 有+号的；
+ functions:函数覆盖率，调用到程式中的每一个函数
  + 6.1 istanbul 生成的测试报告中有个 lcov.info 文件
  + FN:51,(anonymous_4)
     FNF:5
     FNH:3
     FNDA:237,getClassNames
     FNDA:0,getProps
     FNDA:0,(anonymous_2)
     DA:4,1
   + FN:51 代表函数，51行: 这些行分布对应源代码中的函数开始的行号，
   + FNF:5 代表一共有5个函数
   + FNH:3 其实 3 个函数被测试所覆盖，
   + FNDA:237,getClassNames 代表了 getClassNames 这个函数被执行了 237 次。
   + ...

## Vue测试注意事项：
1. 测试环境中props: ['bannerdata'] 这种传值方式不支持。错误提示：内部属性均为未定义/typeErr;


## 注意事项

1. 项目中包干静态页面和动态页面，当开发的一个页面需要静态化时，在路由配置项上添加属性`isStatic: true`
