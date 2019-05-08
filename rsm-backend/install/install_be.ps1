Write-Host "Installing nodejs-lts"

$nodelts = "https://nodejs.org/dist/v10.15.3/node-v10.15.3-x64.msi"
$nodefile= "node-v10.15.3-x64.msi"
$nodeexist = "C:\Program Files\nodejs\node.exe"
function CheckNodeInstalled () {
    $testfile = Test-Path $nodeexist
    if($testfile -eq $True)
    {
        write-host "Node allready installed - skipping node installation"
    }
    else {
        Write-Host "Starting node lts downloading"
        Invoke-WebRequest -Uri $nodelts -OutFile $Env:temp\$nodefile
        $proc = Start-Process -FilePath msiexec -Wait -ArgumentList "/qn /l* node-log.txt /i $Env:temp\$nodefile" -Verb RunAs 
        write-host "Finish installing nodejs-lts"
        Remove-Item $Env:temp\$nodefile -Force
        write-host "Please start installation again because of node path"
        Pause
        Stop-Process -Id $PID
    }
}

function InstallNpmPackage () {
    $npmProc = Start-Process -FilePath powershell -Wait -ArgumentList "npm install --only=production"
}

function InstallBackend () {
    $nodeProc = Start-Process -FilePath powershell -Wait -ArgumentList "node install_be.js"
    write-host "Installation finish"
}

CheckNodeInstalled
InstallNpmPackage
InstallBackend