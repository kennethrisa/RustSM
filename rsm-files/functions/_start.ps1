function StartServer {
    CheckConfig
    UpdateServerInfo
    $variablesFile = '..\rsm-files\functions\_variables.ps1'
    . $variablesFile
    $parameterfile = '.\rsm\config\_parameters.ps1'
    . $parameterfile

    # Check for update
    if (($update -eq "1") -and ($update)) {
        . $updateServerFile

        if (($forceupdate -eq "1") -and ($forceupdate)) {
            # Force update
            ForceUpdateServer
        }
        write-host "Starting update"
        UpdateServer
        if (($oxide -eq "1") -and ($oxide)) {
            UpdateOxide
        }
    }
    try {
        if (($wipe -ne 0) -and ($wipe)){
            write-host "Running wipe $wipe"
            . .\rsm\wipe\wipe$wipe.ps1
        }
    }
    catch {
        write-host "Error running wipe script! please check your wipe file" -ForegroundColor Red
        # send discord alert
    }
    try {
        Set-Location $serverdir        
    }
    catch {
        write-host "Can't find server folder, please set update to 1 or run update" -ForegroundColor Red
        break
    }
    $logdir
    $logdirExist = Test-Path $logdir
    if ($logdirExist -eq $false) {
        New-Item -ItemType Directory -Force -Path $logdir
    }

    Move-Item -Path ".\*.log" -Destination $logdir -Force
    cmd /C "$RustDedicated $parms"
    Set-Location ..

    if ($proc.ExitCode -ne 0) {
        . $updateDefaultServerFile
        write-host "Restarting"
        timeout 10
        UpdateDefaultServerFiles
        StartServer
    }
}