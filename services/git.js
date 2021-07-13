const { exit } = require("process");
const gitConfig = require("git-config");

const getUser = () => {
  const config = gitConfig.sync();
  if (!config && config.user && config.user.email) {
    process.stdout.write(
      "missing user setting\nPlease set user with\n\ngit config --user.name\ngit config --user.email\n\n"
    );
    exit();
  }
  return config.user.email;
};
module.exports = getUser;
