Discord bot
===============

You will have to create an New Application pr server from https://discordapp.com/developers/applications/

After you have created it, click on Bot, then copy token (this you have to make sure you have typed in config)

Invite it to your discord server: https://discordapp.com/oauth2/authorize?&client_id=YOUR_CLIENT_ID_HERE&scope=bot&permissions=0

Create a role to the bot in discord and then create a private channel.

Commands for discord bot with default prefix:

```
!help
!rcon
!set
!get
!wipe
!say
!restart
!abortrestart
```

Set a new hostname:

!set hostname My Main Server

Get a parameter:

!get hostname

Restart server:

!restart 300

Abort server restart

!abortrestart
