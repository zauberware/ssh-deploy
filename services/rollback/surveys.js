const inquirer = require("inquirer");
const { exit } = require("process");
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
    ];
    return inquirer.prompt(questions);
  },
  askRollback: (options) => {
    if (!options.length || (options.length && options.length < 2)) {
      if (options.length)
        console.log(`Current released at: ${options[0].name}`);
      console.log(
        !options.length ? "Nothing deployed yet" : "Rollback not possible"
      );
      exit();
    }
    const withAbortOption = [
      ...(options || []),
      { name: "Abort", value: "abort", date: "abort" },
    ];

    const questions = [
      {
        type: "list",
        name: "rollbackOption",
        message: `Current running released at: ${withAbortOption[0].name}.\n Select Rollback:`,
        choices: withAbortOption.filter((a, i) => i != 0),
      },
      {
        type: "confirm",
        name: "confirmation",
        message: "Sure that you want to rollback",
        default: true,
        when: (answer) => answer.rollbackOption !== "abort",
      },
    ];
    return !options.length ? null : inquirer.prompt(questions);
  },
};
