const Client = require("ssh2-sftp-client");
const { orderBy } = require("lodash");
const moment = require("moment");

const getRollbacks = async ({
  sshConfig,
  userConfig: { basePath },
  callback,
}) => {
  const sftp = new Client();
  let options;
  const res = await sftp
    .connect(sshConfig)
    .then(() => {
      return sftp.list(`${basePath}releases/`);
    })
    .then((data) => {
      const sortedList = orderBy(
        data.filter((n) => n.name !== "log.txt"),
        (o) => o.modifyTime,
        ["desc"]
      ).map((item) => ({
        name: moment(item.modifyTime).format("YYYY-MM-DD HH:mm:ss"),
        value: item.name,
      }));
      options = sortedList;
      return options;
    })
    .then(() => {
      sftp.end();
    })
    .catch((err) => {
      console.error(err.message);
      sftp.end();
    });

  return options;
};
module.exports = getRollbacks;
