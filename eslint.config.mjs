import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier/flat";
import nxPlugin from "@nx/eslint-plugin";
import { builtinModules } from "node:module";

export default defineConfig(
  globalIgnores([
    "**/node_modules/",
    "**/dist/",
    "**/coverage/",
    ".nx/",
    "docs/research/snapshots/",
  ]),
  {
    files: ["**/*.{js,mjs,cjs}"],
    extends: [js.configs.recommended],
  },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [js.configs.recommended, tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["apps/**/*.{ts,tsx}", "packages/**/*.{ts,tsx}"],
    plugins: {
      "@nx": nxPlugin,
    },
    rules: {
      "@nx/enforce-module-boundaries": [
        "error",
        {
          allow: [],
          depConstraints: [
            {
              sourceTag: "scope:platform",
              onlyDependOnLibsWithTags: ["scope:platform"],
            },
            {
              sourceTag: "type:contract",
              onlyDependOnLibsWithTags: ["type:contract"],
              bannedExternalImports: [
                "fastify",
                "fastify/*",
                "react",
                "react/*",
                "react-dom",
                "react-dom/*",
              ],
            },
            {
              sourceTag: "runtime:browser",
              notDependOnLibsWithTags: ["runtime:server"],
              bannedExternalImports: ["fastify", "fastify/*", "pg", "pg/*"],
            },
            {
              sourceTag: "type:engine",
              onlyDependOnLibsWithTags: ["type:metadata", "type:contract"],
              bannedExternalImports: [
                "fastify",
                "fastify/*",
                "react",
                "react/*",
                "react-dom",
                "react-dom/*",
              ],
            },
          ],
        },
      ],
    },
  },
  {
    files: ["apps/desk/src/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: builtinModules,
          patterns: [
            {
              regex: "^node:",
              message: "Node built-ins are not allowed in Desk browser source.",
            },
          ],
        },
      ],
    },
  },
  prettier,
);
