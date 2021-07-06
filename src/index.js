// require('dotenv').config({
//   path: `${process.env.npm_config_env}/.env`,
// });
import "dotenv/config";
import Zip from "adm-zip";
import Client from "ssh2-sftp-client";
import { getUser } from "./lib/helper";
import path from "path";
import moment from "moment";
import { Client as SshClient } from "ssh2";

const gitUser = getUser();
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const port = process.env.PORT;
const basePath = process.env.BASEPATH;
const localStoryFolder = process.env.LOCAL_STORYFOLDER;
const config = {
  username,
  password,
  host,
  port,
};
const currentDate = `${moment().format("YYYY-MM-DD[T]HH.mm.ss")}`;

const upload = () => {
  const zip = new Zip();
  const client = new Client();

  const src = path.join(__dirname, "../", localStoryFolder);

  const dst = `${basePath}releases/${currentDate}/release.zip`;
  const tempFile = path.join(__dirname, "release.zip");

  zip.addLocalFolder(src);
  zip.writeZip(tempFile);

  client
    .connect(config)
    .then(() => client.mkdir(`${basePath}releases/${currentDate}/`, true))
    .then(() => client.put(tempFile, dst))
    .then(() => client.end())
    .then(() => unzip());
  // .then(() => ln())
  // .then(() => log())
};

const unzip = () => {
  const sshClient = new SshClient();
  sshClient
    .on("ready", () => {
      sshClient.shell((err, stream) => {
        if (err) throw err;
        stream
          .on("close", () => {
            console.log("Stream :: close");
          })
          .on("data", (data) => {
            console.log("OUTPUT: " + data);
          });

        stream.end(
          `unzip ${basePath}releases/${currentDate}/release.zip -d ${basePath}releases/${currentDate}/ && echo '[${currentDate}] - successfully unzipped - ${gitUser}' >> ${basePath}releases/log.txt\nexit\n`
        );
      });
      sshClient.shell((err, stream) => {
        if (err) throw err;
        stream
          .on("close", () => {
            console.log("Stream :: close");
          })
          .on("data", (data) => {
            console.log("OUTPUT: " + data);
          });
        stream.end(
          `ln -sfn ${basePath}releases/${currentDate} ${basePath}storybook-static\necho '[${currentDate}] - successfully linked - ${gitUser}' >> ${basePath}releases/log.txt\nexit\n`
        );
      });
      sshClient.shell((err, stream) => {
        if (err) throw err;
        stream
          .on("close", () => {
            console.log("Stream :: close");
            sshClient.end();
          })
          .on("data", (data) => {
            console.log("OUTPUT: " + data);
          });
        stream.end(
          `cd ${basePath}releases && ls -lt | tail -n +8 | awk '{print $9}' | xargs rm -r\necho '[${currentDate}] - removed old releases - ${gitUser}' >> ${basePath}releases/log.txt\nexit\n`
        );
      });
    })
    .connect(config);
};

const ln = () => {
  const sshClient = new SshClient();
  sshClient
    .on("ready", () => {
      sshClient.shell((err, stream) => {
        if (err) throw err;
        stream
          .on("close", () => {
            console.log("Stream :: close");
            sshClient.end();
          })
          .on("data", (data) => {
            console.log("OUTPUT: " + data);
          });
        stream.end(
          `ln -sfn ${basePath}releases/${currentDate} ${basePath}storybook-static\necho '[${currentDate}] - successfully linked - ${gitUser}' >> ${basePath}releases/log.txt\nexit\n`
        );
      });
    })
    .connect(config);
};

const log = () => {
  const sshClient = new SshClient();
  sshClient
    .on("ready", () => {
      sshClient.shell((err, stream) => {
        if (err) throw err;
        stream
          .on("close", () => {
            console.log("Stream :: close");
            sshClient.end();
          })
          .on("data", (data) => {
            console.log("OUTPUT: " + data);
          });
        stream.end(
          `echo '[${currentDate}] - all tasks done - ${gitUser}' >> ${basePath}releases/log.txt\nexit\n`
        );
      });
    })
    .connect(config);
};
upload();

const backup =
  'zip -r ./rigk-kundenportal-sb/backup/"$(date +%Y-%m-%dT%H.%M).zip" ./rigk-kundenportal-sb/storybook-static/';
