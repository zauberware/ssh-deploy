require("dotenv").config({
  path: `${process.env.npm_config_env}/.env`,
});
const { exit } = require("process");
process.chdir(process.env.npm_config_env);
const path = require("path");
const moment = require("moment");
const { getEnvironmentData } = require("../environment");
const { askRollback, askEnv } = require("./surveys");
const prompt = require("../prompt/prompt");
const getRollbacks = require("../getRollbacks");
const rollbackVers = require("../rollbackVers");
const currentDate = `${moment().format("YYYY-MM-DD[T]HH.mm.ss")}`;

const rollback = () => {
  const getEnv = async () => {
    const { environment } = await prompt("Rollback", askEnv).then((res) => {
      return res;
    });
    if (environment === "abort") {
      prompt("Rollback", () => {
        console.log("Abort...");
        exit();
      });
    }
    return environment.toUpperCase();
  };
  getEnv().then((env) => {
    const { fullDeployPath, logPath, sshConfig, gitUser, tempFile } =
      getEnvironmentData(env);
    const config = {
      userConfig: {
        basePath: fullDeployPath,
        currentDate,
        tempFile,
        gitUser,
        logPath,
      },
      sshConfig,
    };

    getRollbacks(config).then(async (options) => {
      if (options) {
        const result = await prompt("Rollback", askRollback, options).then(
          (res) => {
            return res;
          }
        );
        if (result.rollbackOption !== "abort" && result.confirmation) {
          const rollbackPath = path.join(
            config.userConfig.basePath,
            "releases/",
            `${result.rollbackOption}/`
          );

          const rmPath = options
            .slice(
              0,
              options.findIndex((a) => a.value === result.rollbackOption)
            )
            .map((o) => `${fullDeployPath}releases/${o.value}/`)
            .join(" ");

          rollbackVers({ ...config, rollbackPath, rmPath });
        }
      }
    });
  });
};
module.exports = rollback;
