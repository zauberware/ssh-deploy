const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");

const prompt = async (title, survey, options) => {
  clear();
  console.log(
    chalk.yellow(figlet.textSync(title, { horizontalLayout: "full" }))
  );

  const credentials = await survey(options);
  return credentials;
};
module.exports = prompt;
