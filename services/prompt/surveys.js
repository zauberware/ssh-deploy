const inquirer = require("inquirer");
const { exit } = require("process");
module.exports = {
  askMode: () => {
    const questions = [
      {
        type: "list",
        name: "selectedMode",
        message: "Select mode:",
        choices: [
          { name: "Deploy", value: "deploy" },
          { name: "Rollback", value: "rollback" },
          { name: "Abort", value: "abort" },
        ],
      },
    ];
    return inquirer.prompt(questions);
  },
};
