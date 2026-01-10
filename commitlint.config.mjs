const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      // types of commits allowed
      ["feat", "fix", "docs", "style", "refactor", "test", "chore", "perf", "ci", "build", "revert"],
    ],
    "header-max-length": [2, "always", 150],
    "subject-case": [2, "never", ["start-case", "pascal-case", "upper-case"]],
  },
};

// Rule format commitlint documentation: https://commitlint.js.org/#/reference-rules

{/* 
  <type>(<scope>): <subject>

  <body> (optional)
  <footer> (optional) 
*/}

export default config;
