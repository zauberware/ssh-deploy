const { Client } = require("ssh2");

const unzip = async ({
  sshConfig,
  userConfig: { basePath, currentDate, gitUser, logPath },
}) => {
  const sshClient = new Client();
  const unzipCMD = `unzip ${basePath}releases/${currentDate}/release.zip -d ${basePath}releases/${currentDate}/ \n echo '[${currentDate}] - successfully unzipped - ${gitUser}' >> ${logPath}log.txt\n`;
  const linkCMD = `ln -sfn ${basePath}releases/${currentDate} ${basePath}current \n echo '[${currentDate}] - successfully linked - ${gitUser}' >> ${logPath}log.txt\n`;
  const removeOldCMD = `cd ${basePath}releases \n ls -lt | tail -n +8 | awk '{print $9}' | xargs rm -r \n echo '[${currentDate}] - removed old releases - ${gitUser}' >> ${logPath}log.txt\n`;

  return await sshClient
    .on("ready", () => {
      sshClient.shell((err, stream) => {
        if (err) throw err;
        stream
          .on("close", () => {
            console.log("Stream :: close");
            sshClient.end();
          })
          .on("data", (data) => {
            if (data.length > 2) console.log("OUTPUT: " + data);
          });

        stream.end(`${unzipCMD}  ${linkCMD} ${removeOldCMD}\nexit\n`);
      });
    })
    .connect(sshConfig);
};

module.exports = unzip;
