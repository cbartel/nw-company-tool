# ⛏ New World Company Tool 🔨

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/J3J37247V)

![GitHub Repo stars](https://img.shields.io/github/stars/cbartel/nw-company-tool?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/cbartel/nw-company-tool?style=social)

![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/cbartel/nw-company-tool?style=flat-square)
![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/cbartel/nw-company-tool?include_prereleases&label=beta&style=flat-square)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/cbartel/nw-company-tool/Release?style=flat-square)
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/cbartel/nw-company-tool/develop?style=flat-square)
![GitHub all releases](https://img.shields.io/github/downloads/cbartel/nw-company-tool/total?style=flat-square)
![GitHub closed issues](https://img.shields.io/github/issues-closed-raw/cbartel/nw-company-tool?style=flat-square)
## ❓ What is this ❓

This tool is intended to use with the game New World from Amazon Game Studios. It aims to give all your company members 
an overview about other members, their skills and attributes. The tool uses Discord's login and enables all your members
to reach out to other company members easily.

The server is written in [nest.js](https://nestjs.com/) and uses [prisma](https://www.prisma.io/) and 
[SQLite](https://www.sqlite.org/index.html). It runs on [nodejs](https://nodejs.dev/). The webapp is written in
[angular](https://angular.io/).

The tool is currently in an early development state but already usable and stable. It provides your company members with
the ability to maintain their level, gear score, attributes, weapon- and trade skills and shows the data on a company table.

### 🛣️ Roadmap 🛣️

- develop a plugin system to enable other developers to create content for this tool
- create a war planner to make it easier for your company to organize their war efforts
- create an expedition planner
- integrate [NWDB.info](https://nwdb.info/) or a similar website
- enable users to create skill tree builds in this tool to share their builds with your company

## 🚀 How to install 🚀
### Download
Make sure you have [nodejs](https://nodejs.dev/) installed!

Create the following directories for nwct somewhere in your filesystem, I will use `/opt/nwct/` for this example:

```shell
mkdir /opt/nwct
mkdir /opt/nwct/nwct-server
mkdir /opt/nwct/nwct-data

cd /opt/nwct/nwct-server
```

download the latest node distribution from the [Releases Page](https://github.com/cbartel/nw-company-tool/releases) and
extract the compressed tarball

```shell
wget <node distribution url goes here>
tar -zxvf nw-company-tool.tar.gz
```

### Start your server
now try to start your server for the first time with the --dataPath argument
```shell
node dist/main.js --dataPath "/opt/nwct/nwct-data/"
```
if you want to use the beta update channel (**this includes unstable releases!!**) prepend the --beta flag
```shell
node dist/main.js --dataPath "/opt/nwct/nwct-data/" --beta
```

### Configuration
the first startup might take a while, as it downloads all npm packages and creates your database schema. Exit your current node
process and navigate to your data folder:
```shell
cd /opt/nwct/nwct-data
```
edit the `config.json` file in this directory with your favorite editor:
```shell
nano config.json
```
```json
{
  "DISCORD": {
    "CLIENT_ID": "<your Discord OAuth2 Client Id>",
    "CLIENT_SECRET": "<your Discord OAuth2 Client Secret>"
  },
  "BASE_URL": "http://www.example.com:8080",
  "TOKEN_SECRET": "<some secure and secret value to sign your JWTs>",
  "PORT": 8080,
  "DATABASE": "database.db",
  "WEBAPP": {
    "COMPANY": {
      "NAME": "<Your Company Name>",
      "SERVER": "<Your Server>"
    }
  }
}
```
### Discord OAuth2 Setup
as you see, you need to set up a discord application with OAuth2, this is pretty easy to do:
- create a new application at https://discord.com/developers/applications
- navigate to OAuth2, there you will find your `CLIENT_ID` and `CLIENT_SECRET`
- edit your redirects, in this example your NWCT server uses `http://www.example.com:8080` as `BASE_URL`, the redirect would
then be `http://www.example.com:8080/api/login/callback`. Be careful to not any unwanted forward slashes or your login will not work properly.

Go back to your `config.json` file, insert the needed values and save this file.

### Finish
restart your server and open your browser http://www.example.com:8080. You should be able to use the tool.

❗**Please beware: do not run nwct as root, you should create a dedicated user which only has access to the /opt/nwct folder**❗

```shell
cd /opt/nwct/nwct-server
node dist/main.js --dataPath "/opt/nwct/nwct-data/"
``` 

### PM2, nginx and SSL
I would highly recommend the run NWCT via [pm2](https://pm2.keymetrics.io/) behind a 
[nginx proxy server](https://www.nginx.com/) using [certbot](https://certbot.eff.org/instructions).
Reach out for the documentation of pm2 and nginx on how to install it on your machine.

#### Nginx
Once this is done, you can setup a proxy. Create the following file at `/etc/nginx/sites-available/nwct`

```
# This goes in a file within /etc/nginx/sites-available/.

# Define Server
server {

    # Enter your fully qualified domain name or leave blank
    server_name             www.example.com;

    # Listen on port 80 without SSL certificates
    listen                  80;

    # Sets the Max Upload size to 300 MB
    client_max_body_size 300M;

    # Proxy Requests to NWCT
    location / {

        # Set proxy headers
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # These are important to support WebSockets
        # WebSockets are currently not used in NWCT, but are planned in future releases.
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";

        # Make sure to set your NWCT Server port number
        proxy_pass http://localhost:8080;
    }
}
```

Now perform the following steps to enable your nginx proxy:
```shell
# Create a link in sites-enabled to enable your proxy
sudo ln -s /etc/nginx/sites-available/nwct /etc/nginx/sites-enabled

# Test your nginx config
sudo service nginx conftest

# Restart Nginx
sudo service nginx restart
```

Your NWCT Server should now be reachable from http://www.example.com instead of http://www.example.com:8080

#### SSL Certificates
Now it's time to use certbot to setup your SSL Certificates. Follow the instructions on [their page](https://certbot.eff.org/instructions).

After you've done this, your `/etc/nginx/sites-available/nwct` should look somehow like this:

```
# Define Server
server {

    # Enter your fully qualified domain name or leave blank
    server_name             www.example.com;

    # Listen on port 80 without SSL certificates

    # Sets the Max Upload size to 300 MB
    client_max_body_size 300M;

    # Proxy Requests to NWCT
    location / {

        # Set proxy headers
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # These are important to support WebSockets
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";

        # Make sure to set your NWCT Server port number
        proxy_pass http://localhost:8080;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/www.example.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/www.example.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
    
}

server {
    if ($host = www.example.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    server_name             www.example.com;
    listen                  80;
    return 404; # managed by Certbot
}
```

test your nginx config again and restart
```shell
# Test your nginx config
sudo service nginx conftest

# Restart Nginx
sudo service nginx restart
```

Your NWCT Server should now be reachable from https://www.example.com. Congratulations 👍

❗**Please do update your NWCT's `config.json` (located in `/opt/nwct/nwct-data/` with the new `BASE_URL` and your Discord OAuth
Redirect URLs** ❗

#### PM2

PM2 is easy to install and configure. Please reach out to [their page](https://pm2.keymetrics.io/) for further details.
You will need to create a configuration file somewhere in your filesystem, let's put it into `/opt/nwct`and name it 
`nwct.config.js`, it contains the following:
```javascript
module.exports = {
  apps : [{
    name: 'nwct',
    script: '/opt/nwct/nwct-server/dist/main.js',
    args: '--dataPath "/opt/nwct/nwct-data"',
    max_memory_restart: '100M',
    watch: false
  }]
};
```

You can start it via pm2 with the following command
```shell
# Change directory
cd /opt/nwct

# Start the NWCT server
pm2 start nwct.config.js

# List your pm2 processes
pm2 list

# Monitor your pm2 processes
pm2 monit
```

That's it. You now do have a nice environment running NWCT 🚀
