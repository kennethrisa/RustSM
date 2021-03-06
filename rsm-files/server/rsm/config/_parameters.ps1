####### Do not edit this file, it will be replaced on every server start  #######
#######                  See doc for using a custom file                  #######

# import files
. .\rsm\config\config.ps1
. ..\rsm-files\functions\_checkconfig.ps1
. ..\rsm-files\functions\_functions.ps1
. ..\rsm-files\functions\_variables.ps1
CheckConfig

$fallbackFileExist = Test-Path -Path $fallbackFile
if ($fallbackFileExist -eq $False) {
    Write-Output "Fallback file does not exist - Please check if backend is running"
    break
}

# Always read from file, so if backend is offline, it will always load fallback_server file.
$r = Get-Content -RAW $fallbackFile | ConvertFrom-Json

$serverid = $r.id;
$serverdir = $r.dir;
$serverip = $r.serverip;
$serverport = $r.serverport;
$rconip = $r.rconip;
$rconport = $r.rconport;
$rconpassword = $r.rconpassword;
$maxplayers = $r.maxplayers;
$hostname = $r.hostname;
$identity = $r.identity;
$serverlevel = $r.level;
$seed = $r.seed;
$worldsize = $r.worldsize;
$saveinterval = $r.saveinterval;
$headerimage = $r.headerimage;
$serverurl = $r.serverurl;
$update = $r.update;
$forceupdate = $r.forceupdate;
$discord = $r.discord;
$discordurl = $r.discordurl;
$oxide = $r.oxide;
$wipe = $r.wipe;
$branch = $r.branch;
$lastwipe = $r.lastwipe;
$custom = $r.custom;
$title = $r.title;
$uselevelurl = $r.uselevelurl;
$levelurl = $r.levelurl;

# startserver variables

$RustDedicated = "RustDedicated.exe"
$logdir = "..\logs"
$date = get-date -UFormat %y-%m-%d-%H.%M
# $OFS = "`r`n"
if($uselevelurl -eq "1") { write-host "uselevelurl: $uselevelurl"; $levelurl = "+server.levelurl $levelurl"; } else {$levelurl = ""}
# end startserver variables

$parms = "-batchmode -nographics -silent-crashes +server.ip $serverip +server.port $serverport +rcon.rconip $rconip +rcon.port $rconport +rcon.password $rconpassword +server.maxplayers $maxplayers +server.hostname ""$hostname"" +server.identity ""$identity"" +server.level ""$serverlevel"" +server.seed $seed +server.worldsize $worldsize -logfile $date-server.log +server.headerimage $headerimage +server.url $serverurl +server.saveinterval $saveinterval $levelurl $custom +backup"