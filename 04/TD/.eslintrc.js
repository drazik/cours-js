module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
      "prefer-const": "off"
    },
  "overrides": [
    {
      files: [
        "**/*.spec.js"
      ],
      env: {
        jest: true
      }
    },
    {
      files: ["server.js"],
      env: {
        node: true
      }
    }
  ]
};
