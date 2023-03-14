module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-len': 'off',
    'vuejs-accessibility/label-has-for': 'off',
    'import/prefer-default-export': 'off',
    'object-curly-spacing': 'off',
    'vuejs-accessibility/form-control-has-label': 'off',
  },
};
