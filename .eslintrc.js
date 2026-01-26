module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true,
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-unused-expressions": [
      "error",
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    "@typescript-eslint/ban-ts-comment": [
      "error",
      {
        "ts-ignore": false,
        "ts-nocheck": true,
        "ts-check": true,
        "ts-expect-error": false,
      },
    ],
    "@typescript-eslint/no-explicit-any": "off", // allow `any`
    "prefer-rest-params": "off", // ✅ allow use of `arguments`
  },
};
