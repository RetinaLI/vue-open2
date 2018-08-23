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

