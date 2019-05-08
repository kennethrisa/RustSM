# This is an example only, do not customize this one, create a new one that is called wip2.ps1
# and then set wipe to 2, it will then run at startup.
# For an montly wipe example:
. .\rsm\config\parameters.ps1

$rustserverdir = "$serverdir\server\$identity"
Write-Host "Starting wipe $wipe"

# This will remove all blueprints, deaths, sv.files, *.map and all *.save - remove -WhatIf if you want it to run. 
Remove-Item $rustserverdir\Log.EA*
Remove-Item $rustserverdir\player.blueprints.*
Remove-Item $rustserverdir\player.deaths.*
Remove-Item $rustserverdir\sv.files.*
Remove-Item $rustserverdir\*.map
Remove-Item $rustserverdir\*.sav


Write-Host "Wipe $wipe finish"
sleep 2