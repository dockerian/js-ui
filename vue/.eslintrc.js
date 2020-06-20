module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  'extends': [
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    // 'standard',
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    'eslint:recommended',
    // stricter rules
    'plugin:vue/essential'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    // 'vue/html-end-tags': 'off',
    // 'vue/html-self-closing': 'off',
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    // allow async-await
    // 'generator-star-spacing': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
