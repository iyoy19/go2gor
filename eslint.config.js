const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const next = require("@next/eslint-plugin-next");
const react = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");

module.exports = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  // Next.js config
  {
    plugins: { "@next/next": next },
    rules: {
      ...next.configs["core-web-vitals"].rules,
    },
  },

  // React config
  {
    plugins: { react },
    rules: {
      ...react.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
    },
    settings: { react: { version: "detect" } },
  },

  // React Hooks
  {
    plugins: { "react-hooks": reactHooks },
    rules: { 
      ...reactHooks.configs.recommended.rules,
      "react-hooks/rules-of-hooks": "off", // Menonaktifkan peringatan hooks
    },
  },

  // Override rules
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "prettier/prettier": "off", // Menonaktifkan semua warning Prettier
    },
  }
);
