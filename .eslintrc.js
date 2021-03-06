module.exports = {
  "env": {
    "es6": true,
    "node": true
  },
  "plugins": ["babel"],
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module"
  },
  "globals": {
    "it": true,
    "describe": false
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "babel/generator-star-spacing": 0,
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-undef": 1,
    "no-unused-vars": "error",
    "no-console": 1,
    "no-warning-comments": 1
  }
};
