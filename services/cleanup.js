const { exec } = require("child_process");
const path = require("path");
const cleanup = () => {
  const cmd = `rm ${path.join(process.env.npm_config_env, "release.zip")}`;
  exec(cmd, (err, stdout, stderr) => {
    console.log(stdout);
  });
};

module.exports = cleanup;
