module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base/legacy',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 关闭禁止未使用过的变量
    'no-unused-vars': 0,
    // 禁止出现var
    'no-var': 1,
    // 禁止出现console
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 禁止对 function 的参数进行重新赋值
    'no-param-reassign': 0,
    // 禁止标识符中有悬空下划线
    'no-underscore-dangle': 0,
    // 强制一行的最大长度
    'max-len': 0,
    // 禁止在变量定义之前使用它们
    'no-use-before-define': 0,
    // 禁用特定的语法
    'no-restricted-syntax': 0,
    // 禁止直接调用 Object.prototypes 的内置属性
    'no-prototype-builtins': 0,
    // 要求 return 语句要么总是指定返回的值，要么不指定
    'consistent-return': 0,
    // 禁止出现未使用过的表达式
    'no-unused-expressions': 0,
    // 禁用一元操作符 ++ 和 --
    'no-plusplus': 0,
    'semi': [2, 'never']
  }
}
