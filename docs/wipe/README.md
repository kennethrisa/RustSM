Wipe script
===============

You will find example wipe script inside folder: rsm-server1\rsm\wipe

There is two script that you can check out, you can modify it, so it fit your needs.

Remember, do not edit default script named _wipe1.ps1 or _wipe2.ps1 (Those will be overwirted every startup)

First thing you need is to copy the file so its named: wipeX.ps1 where X is a number.

example:

copy _wipe1.ps1 to wipe1.ps1.

to call this script on startup, you will have to use discord command or rest api !set wipe 1.

The number you set is the number of the filename. This is so you can have multiple files.

after setting !set wipe 1, restart the server with !restart 60, you will then see it call this on server startup.

Important: Be sure you set !set wipe 0 after server has started, so it will not be run on next restart!