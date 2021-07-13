const Zip = require("adm-zip");
const path = require("path");

const zipFile = async (src, tempFile) => {
  const zip = new Zip();
  zip.addLocalFolder(src);
  return await zip.writeZip(tempFile);
};
module.exports = zipFile;
