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
    .then((res) => {
      if (res.multiServer) {
        return second(res.envs);
      }
      return second([]);
    })
    .then((res) => {
      const envpath = path.join(process.env.npm_config_env, res.envfile);
      const fileStream = fs.createWriteStream(envpath, { flags: "a" });
      fileStream.write(
        `\n${Object.keys(res)
          .filter((key) => key !== "envfile")
          .map((key) => `${key}=${res[key]}`)
          .join("\n")}`
      );
      fileStream.end();
    });
};
module.exports = init;
