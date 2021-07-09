const path = require("path");

const getBasePath = (environment) =>
  process.env[`${environment}_HOST_BASEPATH`] ||
  process.env.DEFAULT_HOST_BASEPATH ||
  "~/";

const getDeployPath = (environment) =>
  process.env[`${environment}_HOST_DEPLOYPATH`] ||
  process.env.DEFAULT_HOST_DEPLOYPATH ||
  `${environment.toLowerCase()}/`;

const getFullDeployPath = (environment) =>
  path.join(getBasePath(environment), getDeployPath(environment));

const getSshConfig = (environment) => ({
  username:
    process.env[`${environment}_USERNAME`] || process.env.DEFAULT_USERNAME,
  password:
    process.env[`${environment}_PASSWORD`] || process.env.DEFAULT_PASSWORD,
  host: process.env[`${environment}_HOST`] || process.env.DEFAULT_HOST,
  port: process.env[`${environment}_PORT`] || process.env.DEFAULT_PORT,
});

const getStoryBookFolder = () =>
  path.join(
    process.env.npm_config_env,
    process.env.LOCAL_STORYBOOK_FOLDER || "storybook-static/"
  );

const getBuildFolder = () =>
  path.join(
    process.env.npm_config_env,
    process.env.LOCAL_APPFOLDER || "build/"
  );

const getLogFolder = (environment) => {
  const logFolder =
    process.env[`${environment}_HOST_LOGFOLDER`] ||
    process.env.DEFAULT_HOST_LOGFOLDER;
  const base = getBasePath(environment);
  const deploy = getDeployPath(environment);

  return logFolder
    ? path.join(base, logFolder)
    : path.join(base, deploy, "releases/");
};

const getAllPaths = (environment) => ({
  deployPath: getDeployPath(environment),
  basePath: getBasePath(environment),
  logFolder: getLogFolder(environment),
  storyBookFolder: getStoryBookFolder(),
  buildFolder: getBuildFolder(),
});
const getEnvironmentData = (environment) => ({
  basePath: getBasePath(environment),
  deployPath: getDeployPath(environment),
  fullDeployPath: getFullDeployPath(environment),
  logPath: getLogFolder(environment),
  sshConfig: getSshConfig(environment),
  storyBookFolder: getStoryBookFolder(),
  buildFolder: getBuildFolder(),
});

module.exports.getAllPaths = getAllPaths;
module.exports.getBasePath = getBasePath;
module.exports.getDeployPath = getDeployPath;
module.exports.getFullDeployPath = getFullDeployPath;
module.exports.getSshConfig = getSshConfig;
module.exports.getLogFolder = getLogFolder;
module.exports.getEnvironmentData = getEnvironmentData;
