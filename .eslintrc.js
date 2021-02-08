module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "react-native",
    "plugin:prettier/recommended",
    "prettier",
    "prettier/babel",
    "prettier/react",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "prettier", "import", "jsx-a11y", "react-hooks"],
  rules: {
    "prettier/prettier": "error",
  },
};
