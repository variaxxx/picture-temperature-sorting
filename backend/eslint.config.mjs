import antfu from "@antfu/eslint-config";

export default antfu({
  stylistic: {
    indent: 2,
    quotes: "double",
    semi: true,
    overrides: {
      "style/brace-style": ["error", "1tbs"],
      "perfectionist/sort-imports": ["warn", {
        type: "alphabetical",
        groups: [{
          newlinesBetween: "never",
        }],
      }],
      "no-console": "warn",
      "antfu/no-top-level-await": "off",
      "antfu/top-level-function": "warn",
      "node/prefer-global/process": "off",
      "unused-imports/no-unused-vars": "warn",
      "ts/consistent-type-imports": "off",
      "unused-imports/no-unused-imports": "error",
      "ts/explicit-function-return-type": "warn",
    },
  },
  typescript: true,
  jsx: true,
  ignores: ["apps/server/build/", "apps/client/.next/"],
});
