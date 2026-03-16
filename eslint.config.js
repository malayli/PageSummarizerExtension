// eslint.config.js
import js from "@eslint/js";

export default [
  js.configs.recommended, // base recommended rules
  {
    rules: {
      indent: ["error", 2],  // 2-space indentation
      quotes: ["error", "double"],
      semi: ["error", "always"],
    },
  },
];