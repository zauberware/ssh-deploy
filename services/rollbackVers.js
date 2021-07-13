const { Client } = require("ssh2");

const rollbackVers = async ({
  sshConfig,
  userConfig: { basePath, currentDate, gitUser, logPath },
  rollbackPath,
  rmPath,
}) => {
  const sshClient = new Client();

  const rollbackCMD = `ln -sfn ${rollbackPath} ${basePath}current \n echo '[${currentDate}] - rollback successfully - ${gitUser}' >> ${logPath}log.txt\n`;
  const deleteCMD = `rm -r ${rmPath} \n echo '[${currentDate}] - rollback cleanup finished - ${gitUser}' >> ${logPath}log.txt\n`;

  let datas;
  return await sshClient
    .on("ready", () => {
      sshClient.shell((err, stream) => {
        if (err) throw err;
        stream
          .on("close", () => {
            sshClient.end();
          })
          .on("data", (data) => {
            datas = data;
          });
        stream.end(`${rollbackCMD}\n ${deleteCMD} \nexit\n`);
      });
    })
    .connect(sshConfig);
};

module.exports = rollbackVers;
