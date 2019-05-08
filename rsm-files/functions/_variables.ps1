$updateDefaultServerFile = '..\rsm-files\functions\_updatedefaultserverfiles.ps1'
$updateServerFile = '..\rsm-files\functions\_updateserver.ps1'
$stopServerFile = '..\rsm-files\functions\_stop.ps1'
$StatusServerFile = '..\rsm-files\functions\_status.ps1'

$path = Resolve-Path ".\"

# Steam
$steamInstallDir = ".\steamcmd"
$steamCMD = "$steamInstallDir\steamcmd.exe"
$steamAppCache = "$steamInstallDir\appcache"
$steamurl = "https://steamcdn-a.akamaihd.net/client/installer/steamcmd.zip"
$steamfile = "steamcmd.zip"

# oxide
$oxideUrl = "https://api.github.com/repositories/94599577/releases/latest"
$oxideFile = "Oxide-Rust.zip"
$targetFolderOxide = ".\Oxide-Rust"
$destFolder = ".\$serverdir\RustDedicated_Data\Managed"

$fallbackFile = '.\rsm\config\fallback_server.json'