// require("dotenv/config");
require("dotenv").config({
  path: `${process.env.npm_config_env}/.env`,
});

process.chdir(process.env.npm_config_env);

const path = require("path");
const moment = require("moment");
const cleanup = require("../services/cleanup");
const { getEnvironmentData } = require("../services/environment");
const getUser = require("../services/git");
const unzip = require("../services/unzip");
const upload = require("../services/upload");
const zipFile = require("../services/zip");
const currentDate = `${moment().format("YYYY-MM-DD[T]HH.mm.ss")}`;
const tempFile = path.join(process.env.npm_config_env, "release.zip");
const deployStorybook = () => {
  const gitUser = getUser();
  try {
    const env = process.env.BUILD_ENV.toUpperCase();

    const {
      basePath,
      deployPath,
      fullDeployPath,
      logPath,
      sshConfig,
      storyBookFolder,
      buildFolder,
    } = getEnvironmentData(env);
    console.log(
      "%cstoryBookFolder,buildFolder,deployPath:",
      "color: lime; font-size: 1.125rem;",
      {
        basePath,
        deployPath,
        fullDeployPath,
        logPath,
        sshConfig,
        storyBookFolder,
        buildFolder,
      }
    );
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
    console.log(path.join("~/", deployPath));
    console.log(config);
    console.log(process.env.BUILD_ENV.toUpperCase());
    // zipFile(env === "STORYBOOK" ? storyBookFolder : buildFolder, tempFile).then(
    //   () =>
    //     upload(config, () => {
    //       unzip(config).then(() => cleanup());
    //     })
    // );
  } catch (error) {
    if (error) throw error;
  }
};
deployStorybook();
