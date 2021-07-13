require("dotenv").config({
  path: `${process.env.npm_config_env}/.env`,
});
const init = require("../services/init/init");
const prompt = require("../services/prompt/prompt");
const { askMode } = require("../services/prompt/surveys");
process.chdir(process.env.npm_config_env);

const { checkEnvironment } = require("../services/environment");
const rollback = require("../services/rollback/rollback");
const deploy = require("../services/deploy/deploy");
const getMode = (mode) => {
  if (mode === "deploy") {
    console.log("fine deploy");
    return deploy();
  }
  if (mode === "rollback") {
    console.log("fine rollback");
    return rollback();
  }
  if (mode === "init") {
    init().then(() => {
      console.log("thanks for init now start again");
    });
  } else {
    prompt("ssh-deploy", askMode).then((res) => {
      if (res.selectedMode !== "abort") return getMode(res.selectedMode);
      return console.log("Abort...");
    });
  }
};

if (checkEnvironment()) {
  getMode(process.env.ENV_MODE);
} else {
  init().then(() => console.log("Thanks for init. Start again"));
}
