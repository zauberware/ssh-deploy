const inquirer = require("inquirer");
module.exports = {
  askEnv: () => {
    const questions = [
      {
        type: "list",
        name: "environment",
        message: "Select environment:",
        choices: [
          { name: "Staging", value: "staging" },
          { name: "Production", value: "production" },
          { name: "Storybook", value: "storybook" },
          { name: "Abort", value: "abort" },
        ],
        default: "staging",
      },
      {
        type: "confirm",
        name: "confirmation",
        message: "Sure that you want to deploy",
        default: true,
        when: (answer) => answer.environment !== "abort",
      },
    ];
    return inquirer.prompt(questions);
  },
};
