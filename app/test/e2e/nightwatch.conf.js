require('babel-register')
var config = require('../../config')

// http://nightwatchjs.org/gettingstarted#settings-file
module.exports = {
  src_folders: ['test/e2e/specs'], // 测试用例源文件路径
  output_folder: 'test/e2e/reports', // 测试报告地址
  custom_assertions_path: ['test/e2e/custom-assertions'], // 自定义命令，这里用来更新测试信息到custom-assertions
  // selenium是一个用java写的e2e测试工具集，它的API被纳入 w3c的webDriver Api中， nightWatch是对selenium的一个nodejs封装。所有我们需要再配置文件中配置selenium。
  selenium: {
    start_process: true, // 是否开启
    server_path: require('selenium-server').path, // 路径
    host: '127.0.0.1',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': require('chromedriver').path
    }
  },
  // 测试环境的配置
  test_settings: {
    default: {
      selenium_port: 4444,
      selenium_host: 'localhost',
      silent: true, //是否显示 selenium 命令日志。
      globals: { //在测试代码中可以访问的全局变量，并且每次切换测试环境时可以重写该值
        devServerURL: 'http://localhost:' + (process.env.PORT || config.dev.port)
      }
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    },

    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    }
  }
}
