require("dotenv").config({
  path: `${process.env.npm_config_env}/.env`,
});
const init = async () => {
  process.chdir(process.env.npm_config_env);
  const fs = require("fs");
  const path = require("path");

  const prompt = require("../prompt/prompt");
  const { askServer, askEnvData } = require("./surveys");
  const first = async () => {
    const result = await prompt("Init", askServer);
    return result;
  };
  const second = async (envs) => {
    if (envs.length) {
      return await prompt("Init", askEnvData, { envs });
    }
    return await prompt("Init", askEnvData, { envs: ["default"] });
  };
  return await first()
    .then(async (res) => {
      if (res.multiServer) {
        return second(res.envs);
      }
      const data = await second([]);
      console.log("%cdata:", "color: lime; font-size: 1.125rem;", data);
      return { envs: res.envs, data };
    })
    .then((res) => {
      const envpath = path.join(process.env.npm_config_env, res.data.envfile);
      const fileStream = fs.createWriteStream(envpath, { flags: "a" });
      const { envs } = res;
      fileStream.write(
        envs
          ? `DEPLOY_ENVIRONMENTS=${envs.join(",")}`
          : "DEPLOY_ENVIRONMENTS=default"
      );
      fileStream.write(
        `\n${Object.keys(res.data)
          .filter((key) => key !== "envfile")
          .map((key) => `${key}=${res.data[key]}`)
          .join("\n")}`
      );
      fileStream.end();
    });
};
module.exports = init;
