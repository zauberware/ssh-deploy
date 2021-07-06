import { exit } from "process";
import gitConfig from "git-config";

export const getUser = () => {
  const config = gitConfig.sync();
  if (!config?.user?.email) {
    process.stdout.write(
      "missing user setting\nPlease set user with\n\ngit config --user.name\ngit config --user.email\n\n"
    );
    exit();
  }
  return config?.user?.email;
};
