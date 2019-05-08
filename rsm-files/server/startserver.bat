Powershell.exe -executionpolicy remotesigned -File server.ps1 updatefiles
timeout 2
Powershell.exe -noexit -executionpolicy remotesigned -File server.ps1 start
