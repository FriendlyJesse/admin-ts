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
    'space-before-function-paren': ['error', 'always'], // 方法前必须有空格
    "indent": [1, 2], // 缩进2
    "eqeqeq": 2,//必须使用全等
    "no-multi-spaces": 1,//不能用多余的空格
  }
}
