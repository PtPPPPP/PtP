import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    ignores: [
      ".next/**",
      "out/**",
      ".wrangler/**",
      ".visual-checks/**",
      "graphify-out/**",
      "coverage/**",
      "node_modules/**",
    ],
  },
];

export default eslintConfig;
