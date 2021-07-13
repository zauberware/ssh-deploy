require("dotenv").config({
  path: `${process.env.npm_config_env}/.env`,
});

process.chdir(process.env.npm_config_env);

const path = require("path");
const moment = require("moment");
const cleanup = require("../cleanup");
const { getEnvironmentData } = require("../environment");
const getUser = require("../git");
const unzip = require("../unzip");
const upload = require("../upload");
const zipFile = require("../zip");
const prompt = require("../prompt/prompt");
const currentDate = `${moment().format("YYYY-MM-DD[T]HH.mm.ss")}`;
const tempFile = path.join(process.env.npm_config_env, "release.zip");
const { askEnv } = require("./surveys");
const { exit } = require("process");
const deploy = () => {
  const getEnv = async () => {
    const { environment } = await prompt("Deploy", askEnv).then((res) => {
      return res;
    });
    if (environment === "abort") {
      prompt("Deploy", () => {
        console.log("Abort...");
        exit();
      });
    }
    return environment.toUpperCase();
  };

  getEnv().then((env) => {
    console.log("Prepare upload...");
    const {
      gitUser,
      fullDeployPath,
      logPath,
      sshConfig,
      storyBookFolder,
      buildFolder,
    } = getEnvironmentData(env);
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
    zipFile(env === "STORYBOOK" ? storyBookFolder : buildFolder, tempFile).then(
      () =>
        upload(config, () => {
          console.log("Finished upload");
          unzip({
            ...config,
            callback: () => {
              console.log("Deploy succesfull!\nCleanup...");
              cleanup();
            },
          });
        })
    );
  });
};
module.exports = deploy;
