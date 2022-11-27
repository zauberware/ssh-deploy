const inquirer = require("inquirer");
module.exports = {
  askEnv: (availableEnvs) => {
    let choices = [
      { name: "Staging", value: "staging" },
      { name: "Production", value: "production" },
      { name: "Storybook", value: "storybook" },
      { name: "Abort", value: "abort" },
    ];
    choices = choices.filter(
      (c) => c.name === "Abort" || availableEnvs.includes(c.value)
    );
    const questions = [
      {
        type: "list",
        name: "environment",
        message: "Select environment:",
        choices,
        default: choices[0],
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
