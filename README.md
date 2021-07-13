# ssh-deploy

### Table of Contents

- [Install](#install)
- [Create vhosts](#create-vhosts)
- [Env](#.env)
  - [Sample](#sample)
  - [Options](#env-options)
- [package.json scripts](#package.json-scripts)

## Install

```
npm i @zauberware/ssh-deploy --save
```

## Create vhosts

nginx minimum config for default .env

**storybook**

```
server {
    listen 80;
    server_name storybook.example.com;

    # Tell Nginx your app's 'public' directory is
    root /home/exampleuser/storybook/current;
}
```

**staging**

```
server {
    listen 80;
    server_name staging.example.com;

    # Tell Nginx your app's 'public' directory is
    root /home/exampleuser/staging/current;
}
```

**production**

```
server {
    listen 80;
    server_name production.example.com;

    # Tell Nginx your app's 'public' directory is
    root /home/exampleuser/production/current;
}
```

## .env

Configure and put these env variables to your .env file.
Or use the gui for the basic configuration

```
ENV_MODE=init npm explore @zauberware/ssh-deploy -- npm run sshDeploy --env=$PWD
```

### Sample

```
DEFAULT_USERNAME=exampleuser
DEFAULT_PASSWORD=supersecretpassword
DEFAULT_HOST=example.com
DEFAULT_PORT=22

DEFAULT_HOST_BASEPATH=~/
DEFAULT_HOST_LOGFOLDER=releases/

LOCAL_STORYBOOK_FOLDER=storybook-static/
LOCAL_APPFOLDER=build/
```

### Options

Overview of possible .env key=value options

#### local folders

| Key                    |   Defaultvalue    | Description                                            |
| :--------------------- | :---------------: | ------------------------------------------------------ |
| LOCAL_STORYBOOK_FOLDER | storybook-static/ | folder where the storybook build on your machine lives |
| LOCAL_APPFOLDER        |      build/       | folder where the build on your machine lives           |

#### connection

| Key                    | Defaultvalue | Description                                                                                            |
| ---------------------- | :----------: | ------------------------------------------------------------------------------------------------------ |
| DEFAULT_USERNAME       |     ---      | user for ssh connection                                                                                |
| DEFAULT_PASSWORD       |     ---      | password for ssh connection                                                                            |
| DEFAULT_HOST           |     ---      | hostaddress or name for ssh connection                                                                 |
| DEFAULT_PORT           |     ---      | port for ssh connection                                                                                |
| DEFAULT_HOST_BASEPATH  |      ~/      | basepath where the subfolders for deployment live (default subfolders: production, staging, storybook) |
| DEFAULT_HOST_LOGFOLDER |  releases/   | relative path to logfile savelocation                                                                  |

#### optional options for storybook

| Key                       | Defaultvalue | Description                                                |
| :------------------------ | :----------: | ---------------------------------------------------------- |
| STORYBOOK_USERNAME        |     ---      |                                                            |
| STORYBOOK_PASSWORD        |     ---      |                                                            |
| STORYBOOK_HOST            |     ---      |                                                            |
| STORYBOOK_PORT            |     ---      |                                                            |
| STORYBOOK_HOST_BASEPATH   |      ~/      |                                                            |
| STORYBOOK_HOST_DEPLOYPATH |  storybook/  |                                                            |
| STORYBOOK_HOST_LOGFOLDER  |  releases/   | relative path to logfile savelocation for storybook deploy |

#### optional options for staging

| Key                     | Defaultvalue | Description |
| :---------------------- | :----------: | ----------- |
| STAGING_USERNAME        |     ---      |             |
| STAGING_PASSWORD        |     ---      |             |
| STAGING_HOST            |     ---      |             |
| STAGING_PORT            |     ---      |             |
| STAGING_HOST_BASEPATH   |      ~/      |             |
| STAGING_HOST_DEPLOYPATH |   staging/   |             |
| STAGING_HOST_LOGFOLDER  |  releases/   |             |

#### optional options for production

| Key                        | Defaultvalue | Description |
| :------------------------- | :----------: | ----------- |
| PRODUCTION_USERNAME        |     ---      |             |
| PRODUCTION_PASSWORD        |     ---      |             |
| PRODUCTION_HOST            |     ---      |             |
| PRODUCTION_PORT            |     ---      |             |
| PRODUCTION_HOST_BASEPATH   |      ~/      |             |
| PRODUCTION_HOST_DEPLOYPATH |  production  |             |
| PRODUCTION_HOST_LOGFOLDER  |  releases/   |             |

## package.json scripts

Put these scripts into your root package.json

```
"deploy": "ENV_MODE=deploy npm explore @zauberware/ssh-deploy -- npm run sshDeploy --env=$PWD",
"rollback": "ENV_MODE=rollback npm explore @zauberware/ssh-deploy -- npm run sshDeploy --env=$PWD",
"sshDeploy": "npm explore @zauberware/ssh-deploy -- npm run sshDeploy --env=$PWD",
```
