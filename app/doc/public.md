# 公用样式 global.scss

1.居中（父元素需要设置position: relative）
  + .vc 垂直居中
  + .hc 水平居中
  + .vhc 垂直水平居中

2.文本溢出变省略号
  + .text-overflow-single 单行（元素需设置宽度）
  + .text-overflow-multi 多行（元素需设置宽度和高度）

3.表格内容样式
  + .my-table 标题行颜色rgba(51,51,51,.5),内容颜色#333,字号14
  + 单元格宽度统一化 参见 lib/cellWidth

4.车联网公用样式
  + .cars-bg  灰色背景色: #f7f7f8

5.动画指令(lib/directive.js)
  + 实现方式: scrollreveal（可拓展其他运动方式: 请自行拓展）
  + 使用方式: v-reveal
  + 参数写法(默认)：
  + v-reveal="{duration?: 400, delay?: 200, origin?: 'right', offset?: '100px', easing?: 'linear'}"
  + duration: 运动执行时间
  + delay: 延迟执行时间
  + origin: 方向'top','bottom','left','top'
  + offset: 运动的距离
  + easing: 动画缓冲方式

# 公用组件

1.mavon-editor markdown编辑器
  + npm install 安装
  + 已在main.js 中全局引用，安装后直接使用
  + 参考 https://github.com/hinesboy/mavonEditor
  + 参考 serviceDetail 第9行
  + my-markdown-editor 类 去自带的背景色和阴影

# 公用方法
