// Flat ESLint config (ESLint v9+) with TypeScript support.
const tseslint = require("typescript-eslint");

module.exports = tseslint.config(
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
  }
);
