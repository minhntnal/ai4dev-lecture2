import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: ["src/generated/**"],
    languageOptions: {
      globals: {
        ...globals.node,
        // Add any other specific globals if needed, e.g., for browser-like generated code
        // "console": "readonly",
        // "module": "readonly",
        // "require": "readonly",
        // "process": "readonly",
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // Add any specific ESLint rules here
    },
  },
];