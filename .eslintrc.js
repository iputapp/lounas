/** @type {import("eslint").ESLint.ConfigData} */
const config = {
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["unused-imports", "simple-import-sort", "import"],
  rules: {
    /** @see {@link https://www.npmjs.com/package/eslint-plugin-unused-imports} */
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "warn",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    /** @see {@link https://github.com/lydell/eslint-plugin-simple-import-sort} */
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
    "import/first": "warn",
    "import/newline-after-import": "warn",
    "import/no-duplicates": "warn",
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
  },
};

module.exports = config;
