$parameterfile = ".\rsm\config\_parameters.ps1"
. $parameterfile

function Steam {
    $steamInstalled = Test-Path $steamCMD
    if ($steamInstalled -eq $false) {
        New-Item -ItemType Directory -Path $steamInstallDir
        Invoke-WebRequest -Uri $steamurl -OutFile $steamfile
        $sourceFile = Resolve-Path $steamfile
        $targetFolder = Resolve-Path $steamInstallDir

        [System.Reflection.Assembly]::LoadWithPartialName('System.IO.Compression.FileSystem')
        [System.IO.Compression.ZipFile]::ExtractToDirectory($sourceFile, $targetFolder)
        # Expand-Archive $steamfile -DestinationPath .\steamcmd\ -Force # This only works for powershell 5.0
        Remove-Item $steamfile -Force
        
    }
}
function UpdateServer () {
    Write-Host "Starting update of server"
    Steam
    CleanAppCache
    Start-Process -FilePath $steamCMD -NoNewWindow -Wait -ArgumentList "+login anonymous +force_install_dir ..\$serverdir +app_update 258550 -beta $branch +quit"
}
function ForceUpdateServer () {
    Steam
    Start-Process -FilePath $steamCMD -NoNewWindow -Wait -ArgumentList "+login anonymous +force_install_dir ..\$serverdir +app_update 258550 -beta $branch validate +quit"
}
function UpdateOxide () {
    write-host "Starting Oxide update"
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    $json = Invoke-RestMethod -Uri $oxideUrl
    $downloadurl = $json.assets.browser_download_url
    $tempfolder = Test-Path $targetFolderOxide
    $folder = Resolve-Path ".\"
    
    Set-Location $folder
    if ($tempfolder -eq $true)
    {
        Remove-Item $targetFolderOxide -Recurse -Force
    }
    Invoke-WebRequest -Uri $downloadurl -OutFile $oxideFile
    try {
        $extractFolder = Resolve-Path $oxideFile
    }
    catch {
        write-host "Can't resolve, continue"
    }
    [System.Reflection.Assembly]::LoadWithPartialName('System.IO.Compression.FileSystem')
    [System.IO.Compression.ZipFile]::ExtractToDirectory($extractFolder, $targetFolderOxide)
    Get-ChildItem -Path $targetFolderOxide -Recurse | Copy-Item -Destination $destFolder -Force
    # Expand-Archive $oxideFile -DestinationPath .\$serverdir -Force # This only works for powershell 5.0
    Remove-Item $oxideFile -Force
    timeout 2
    Remove-Item $targetFolderOxide -Recurse -Force
}