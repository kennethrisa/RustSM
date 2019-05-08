$variablesFile = '..\rsm-files\functions\_variables.ps1'
. $variablesFile

function CheckConfig {
    $config = ".\rsm\config\config.ps1"
    $configExist = Test-Path -path $config
    if($configExist -eq $False) {
        
        GetApiFromBackend
    }
}
function GetApiFromBackend {
    if(($serverid = Read-Host "Server id: Press enter to accept default value: [1]") -eq ''){$serverid = "1" }else{$serverid}
    $backendConfig = "..\rsm-backend\config\config$serverid.json"
    $backendGlobalConfig = "..\rsm-backend\config\globalconfig.json"
    $backendConfigExist = Test-Path -Path $backendConfig
    if ($backendConfigExist -eq $true) {
        $getConfig = Get-Content $backendConfig -Raw | ConvertFrom-Json
        $getGlobalConfig = Get-Content $backendGlobalConfig -Raw | ConvertFrom-Json
        
        $apiurl = $getConfig.apiUrl;
        $apikey = $getGlobalConfig.apikey;
        
        Write-Output "`$id` = ""$serverid""","`$apiurl` = ""$apiurl""", "`$apikey` = ""$apikey""" > $config
    } else {
        NewConfig
    }
}
function NewConfig {

    $backendGlobalConfig = "..\rsm-backend\config\globalconfig.json"
    $backendGlobalConfigExist = Test-Path -Path $backendGlobalConfig

    if ($backendGlobalConfigExist -eq $true) {        
        $getGlobalConfig = Get-Content $backendGlobalConfig -Raw | ConvertFrom-Json
        $apikey = $getGlobalConfig.apikey;

        if(($readserverid = Read-Host "Server id: Press enter to accept default value: [1]") -eq ''){$readserverid = "1" }else{$readserverid}
        if(($readapikey = Read-Host "Please enter your apikey from backend config: Press enter to accept default value: [$apikey]") -eq ''){$readapikey = $readapikey }else{$readapikey}
        $backendConfig = "..\rsm-backend\config\config$readserverid.json"
        $backendConfigExist = Test-Path -Path $backendConfig
        if ($backendConfigExist -eq $true) {
            $backendConfig = "..\rsm-backend\config\config$readserverid.json"
            $getConfig = Get-Content $backendConfig -Raw | ConvertFrom-Json
            $apiurl = $getConfig.apiUrl;
            if(($readapiurl = Read-Host "Please enter apiurl from backend config: Press enter to accept default value: [$apiurl]") -eq ''){$readapiurl = $apiurl }else{$readapiurl}
        }
        else {
            $apiurl = "http://localhost:4500/api/server/1"
            if(($readapiurl = Read-Host "Please enter apiurl from backend config: Press enter to accept default value: [$apiurl]") -eq ''){$readapiurl = $apiurl }else{$readapiurl}
        }
        Write-Output "`$id` = ""$readserverid""","`$apiurl` = ""$readapiurl""", "`$apikey` = ""$readapikey""" > $config
    }
    else {
        if(($readserverid = Read-Host "Server id: Press enter to accept default value: [1]") -eq ''){$readserverid = "1" }else{$readserverid}
        if(($readserverid = Read-Host "Server id: Press enter to accept default value: [1]") -eq ''){$readserverid = "1" }else{$readserverid}
        $readapikey = Read-Host "Please enter your apikey from backend config"
        $readapiurl = Read-Host "Please enter apiurl from backend config"
        Write-Output "`$id` = ""$readserverid""","`$apiurl` = ""$readapiurl""", "`$apikey` = ""$readapikey""" > $config
    }
}
function CleanAppCache () {
    $appcache = Test-Path -Path $steamAppCache
    if ($appcache -eq $true ) {
        Write-Output "Cleaning appacache"
        Remove-Item $steamAppCache\* -Recurse -Force
    }
}
function UpdateServerInfo () {
    $debug = $true
    . .\rsm\config\config.ps1
   
    # Gets new data from rest api and save it to file
    try {
        $headers = New-Object "System.Collections.Generic.Dictionary[[String],[String]]"
        $headers.Add("apikey", $apikey)
        $data = Invoke-RestMethod $apiurl -Headers $headers -TimeoutSec 10 -OutFile $fallbackFile
    }
    catch {
        if($debug) {
            $ErrorMessage = $_.Exception.Message
            Write-Host $ErrorMessage
            #break
        }
        $ErrorMessage = $_.Exception.Message
        Write-Host $ErrorMessage
        Write-host "Can not contact backend, please check"
    }
}
function Commands () {
    if (($command -eq "start") -or ($command -eq "s")) {
        $startServerFile = '..\rsm-files\functions\_start.ps1'
        . $startServerFile
        StartServer
    }
    elseif (($command -eq "update") -or ($command -eq "u")) {
        $updateDefaultServerFile = '..\rsm-files\functions\_functions.ps1'
        . $updateServerFile
        UpdateServer
    }
    elseif (($command -eq "forceupdate") -or ($command -eq "f")) {
        $updateServerFile = '..\rsm-files\functions\_functions.ps1'
        . $updateServerFile
        ForceUpdateServer
    }
    elseif (($command -eq "updatefiles") -or ($command -eq "uf")) {
        $updateDefaultServerFile = '..\rsm-files\functions\_updatedefaultserverfiles.ps1'
        . $updateDefaultServerFile
        UpdateDefaultServerFiles
    }
    elseif (($command -eq "updateserverinfo") -or ($command -eq "usi")) {
        UpdateServerInfo
    }
    elseif (($command -eq "new") -or ($command -eq "n")) {
        NewConfig
    }
    elseif ($command -eq "stop") {
        . $stopServerFile
        StopServer
    }
    elseif (($command -eq "kill") -or ($command -eq "k")) {
        . $stopServerFile
        Killserver
    }
    elseif (($command -eq "status") -or ($command -eq "st")) {
        . $StatusServerFile
        Status
    }
    else 
    {
        $versionfile = "..\rsm-backend\package.json"
        $getVersion = Get-Content $versionfile -Raw | ConvertFrom-Json
        $version = $getVersion.version
        Write-Output "
        ----------------------
        Version: $version
        ----------------------
        RustSM - Rust Server Manager for Windows
        ----------------------
        https://github.com/kennethrisa/RustSM
        ----------------------
        ----------------------
        Commands:
        start|s                 | Start the server.
        stop                    | Stop the server gracefully (sends quit command).
        kill|k                  | Stop the server with force (kill).
        update|u                | Update rust server.
        forceupdate|f           | Force update rust server with validate.
        updateserverinfo|usi    | Update serverinfo from rest api.
        updatefiles|uf          | Update all default serverfiles.
        new|n                   | Creates new config for apikey and apiurl.
        ";
    }   
}