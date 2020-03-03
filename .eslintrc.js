module.exports = {
  root: true,
  env: {
    node: true,
    "cypress/globals": true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': 0,
    'comma-dangle': 0,
    'no-prototype-builtins': 0,
    'no-unused-expressions': 0,
    'eol-last': 0,
    'max-len': 0,
    'import/newline-after-import': 0,
  },
  plugins: [
    "cypress"
  ]
};
