const SftpClient = require("ssh2-sftp-client");
const client = new SftpClient();
// const path = require('path')
const upload = async (
  { userConfig: { basePath, currentDate, tempFile }, sshConfig },
  callback
) => {
  // const dst1 = path.join(basePath,'releases',currentDate,'releases.zip')
  const dst = `${basePath}releases/${currentDate}/release.zip`;
  return await client
    .connect(sshConfig)
    .then(() => client.mkdir(`${basePath}releases/${currentDate}/`, true))
    .then(() => client.put(tempFile, dst))
    .then(() => client.end().then(() => callback()))
    .catch((err) => {
      if (err) console.error(err.message);
    });
};
module.exports = upload;
