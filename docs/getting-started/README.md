Getting started
===============

This guide will take you through the required tools and how to install on windows

## Install backend

```
1. Go to \rsm-backend\install and dobbel click on 1.install_backend.bat

2. If setup ask you rerun the setup, this is because of node path registry. Rerun install_backend.bat


Now you will be prompt to setup rust servers.

- How many server you want to setup (max 5) Default 1, press enter for default

- Api port: (press enter for default 4500) This is for the api server.

- Enable discord bot for this server, press 1. press 0 for disable.

This require that you have setup an discord application, and you will need your bot token.

- Discord token: Enter your discord token

- Choose Discord prefix: press enter for default (!)

- Discord role permission: press enter for default (Owner)

- This is the permission you have setup in your discord, to have permission to use the bot.

- Api url for server: Press enter for default
```


### Next up is setup for the rust server. 

Please be aware of the ID, if you want to setup multiple servers.

Follow the prompt for parameters to the rust server, if you have choosed more than 1 rust server, it will loop through all.

```
When install is complete, go back one folder to \rsm-backend.
Dobbel click on start_backend.bat to start the backend
```

```
How to create rust server:
Go back to RustSM folder and dobbel click on: create_servers.bat
This will auto create server folders for you, default: rsm-server1
```

```
How to start the server:
Go into folder: rsm-server1, and dobbel click on startserver.bat

It will auto install steamcmd, install rust and oxide if that has been set in config.

To make it not update on every restart !set oxide 0
```