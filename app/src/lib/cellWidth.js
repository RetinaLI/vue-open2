/*
* WITH_LESS_2_WORDS 表示单元格内容不超过2个字， 如序号、操作等
* WITH_LESS_8_WORDS 表示单元格内容不超过8个字， 如 调用单价（元/次） 等
* WITH_INDEFINITE_SUPER_LENGTH_TEXT 表示字数不定，值表示min-width   如接口名称、接口地址等
* 其他情况可自行添加或组件内自行设置具体数值
*/

const CELL_WIDTH = {
  WITH_LESS_2_WORDS: 80,
  WITH_LESS_8_WORDS: 140,
  WITH_WITH_INDEFINITE_SUPER_LENGTH_TEXT: 150
};
export default CELL_WIDTH;
