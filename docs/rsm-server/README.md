RSM-Server
===============

You can always create more server by running install script, just specify total amount of servers (It will remember all the parameters from prev servers, you just have to go trough all)

After you have added more servers, you can dobbel click: create_servers.bat, and it will auto create folders if it does not exist.

## server.ps1

you can run commands manually by open powershell inside the rsm-serverX folder .\server.ps1

```
        ----------------------
        Version: 
        ----------------------
        RustSM - Rust Server Manager for Windows
        ----------------------
        https://github.com/kennethrisa/RustSM
        ----------------------
        ----------------------
        Commands:
        start|s                 | Start the server.
        stop                    | Stop the server gracefully and stops script.
        kill|k                  | Stop the server with force (kill).
        update|u                | Update rust server.
        forceupdate|f           | Force update rust server with validate.
        updateserverinfo|usi    | Update serverinfo from rest api.
        updatefiles|uf          | Update all default serverfiles.
        new|n                   | Creates new config for apikey and apiurl.
```