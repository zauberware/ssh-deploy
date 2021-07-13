const inquirer = require("inquirer");
const { exit } = require("process");
module.exports = {
  askServer: () => {
    const questions = [
      {
        type: "confirm",
        name: "multiServer",
        message: "Multiple server for deployment?",
        default: false,
      },
      {
        type: "checkbox",
        name: "envs",
        message: "Please select used environments",
        choices: [
          { name: "Staging", value: "staging" },
          { name: "Production", value: "production" },
          { name: "Storybook", value: "storybook" },
        ],
        when: (answer) => answer.multiServer,
      },
    ];
    return inquirer.prompt(questions);
  },
  askEnvData: ({ envs }) => {
    const questions = [
      ...envs.map((env) => [
        {
          type: "input",
          name: `${env}_host`.toUpperCase(),
          message: `Type ${env} hostname`,
        },
        {
          type: "input",
          name: `${env}_port`.toUpperCase(),
          message: `Type ${env} port`,
          default: "22",
        },
        {
          type: "input",
          name: `${env}_username`.toUpperCase(),
          message: `Type ${env} username`,
        },
        {
          type: "password",
          name: `${env}_password`.toUpperCase(),
          message: `Type ${env} password`,
        },
        {
          type: "input",
          name: `${env}_host_basepath`.toUpperCase(),
          message: `Type ${env} basepath (absolut)`,
        },
        {
          type: "input",
          name: `${env}_host_deploypath`.toUpperCase(),
          message: `Type ${env} path to deploy (recursive to basepath)`,

          when: () => env !== "default",
        },
        {
          type: "input",
          name: `${env}_host_logfolder`.toUpperCase(),
          message: `Type ${env} path which contains logfile (recursive to basepath)`,
        },
      ]),

      [
        {
          type: "input",
          name: `LOCAL_STORYBOOK_FOLDER`.toUpperCase(),
          default: "storybook-static/",
          message: `Type path which contains storybook build`,
        },
        {
          type: "input",
          name: `LOCAL_APPFOLDER`.toUpperCase(),
          default: "build/",
          message: `Type path which contains the react build`,
        },
        {
          type: "input",
          name: `envfile`,
          default: ".env",
          message: `Custom .env path?`,
        },
      ],
    ].reduce((a, b) => [...a, ...b]);
    return inquirer.prompt(questions);
  },
};
