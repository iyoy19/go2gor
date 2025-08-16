const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const next = require("@next/eslint-plugin-next");
const react = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const jsxA11y = require("eslint-plugin-jsx-a11y");
const importPlugin = require("eslint-plugin-import");
const prettier = require("eslint-plugin-prettier");

module.exports = tseslint.config(
  // ✅ Base recommended
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  // ✅ Next.js core web vitals
  {
    plugins: { "@next/next": next },
    rules: {
      ...next.configs["core-web-vitals"].rules,
    },
  },

  // ✅ React
  {
    plugins: { react },
    rules: {
      ...react.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "error",
    },
    settings: { react: { version: "detect" } },
  },

  // ✅ React Hooks
  {
    plugins: { "react-hooks": reactHooks },
    rules: { ...reactHooks.configs.recommended.rules },
  },

  // ✅ JSX a11y
  {
    plugins: { "jsx-a11y": jsxA11y },
    rules: { ...jsxA11y.configs.recommended.rules },
  },

  // ✅ Import plugin (typescript)
  {
    plugins: { import: importPlugin },
    rules: { ...importPlugin.configs.typescript.rules },
  },

  // ✅ Prettier
  {
    plugins: { prettier },
    rules: {
      "prettier/prettier": "error",
    },
  },
);
