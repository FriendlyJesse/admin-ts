module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/recommended',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': [ 'error', 'always' ], // 方法前必须有空格
    'indent': [ 1, 2 ], // 缩进2
    'eqeqeq': 2, // 必须使用全等
    'no-multi-spaces': 0, // 不能用多余的空格
    'no-inner-declarations': [ 2, 'functions' ], // 禁止在块语句中使用声明（变量或函数）
    'no-irregular-whitespace': 2, // 不能有不规则的空格
    'no-mixed-requires': [ 0, false ], // 声明时不能混用声明类型
    'no-mixed-spaces-and-tabs': [ 2, false ], // 禁止混用tab和空格
    'no-unused-vars': [ 2, { 'vars': 'all', 'args': 'after-used' } ], // 不能有声明后未被使用的变量或参数
    'semi': [ 2, 'never' ], // 语句强制分号结尾
    'sort-vars': 0, // 变量声明时排序
    'space-before-blocks': 'error', // 不以新行开始的块{前面要不要有空格
    'comma-spacing': [ 'error', { 'before': false, 'after': true } ], // 逗号后一定要有空格
    'space-unary-ops': [ 1, { 'words': true, 'nonwords': false } ], // 一元运算符的前/后要不要加空格
    'spaced-comment': 1, // 注释风格要不要有空格什么的,
    'space-infix-ops': 1, // 中缀操作符周围要不要有空格
    'no-trailing-spaces': 2, // 一行结束后面有空格就发出警告
    'key-spacing': [ 0, { 'beforeColon': false, 'afterColon': true } ], // 对象字面量中冒号的前后空格
    'quotes': [ 1, 'single' ], // 引号类型 `` "" ''
    '@typescript-eslint/no-explicit-any': 'off', // 允许不明确的使用any
    'array-bracket-spacing': [ 'error', 'always' ], // 数组内左右空格
    'object-curly-spacing': [ 'error', 'always' ] // 对象内左右空格
  }
}
