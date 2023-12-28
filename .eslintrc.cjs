module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "airbnb",
    "prettier",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
    {
      files: ["src/redux/reducers/*.js"],
      rules: { "default-param-last": "off" },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    react: { version: "18.2" },
  },
  rules: {
    "react/function-component-definition": "off",
    "react/react-in-jsx-scope": "off",
    "arrow-body-style": "off",
    "react/jsx-no-target-blank": "off",
    "import/no-unresolved": ["error", { ignore: [".svg"] }],
    "import/no-absolute-path": "off",
    "react/prop-types": "warn",
    "no-underscore-dangle": "off",
    "react/require-default-props": "warn",
    "prefer-destructuring": "warn",
    "react/button-has-type": "warn"
  },
};
