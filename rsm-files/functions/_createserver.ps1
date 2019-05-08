$backendGlobalConfig = ".\rsm-backend\config\globalconfig.json"
$backendGlobalConfigExist = Test-Path -Path $backendGlobalConfig
if ($backendGlobalConfigExist -eq $true) {
    $getGlobalConfig = Get-Content $backendGlobalConfig -Raw | ConvertFrom-Json

    # $id = $getConfig.id;
    $servers = $getGlobalConfig.servers;
    $maxservers = "5";
    for ($s=1; $s -le $servers; $s++)
    {
        # $s
        Write-Output $s
        $serverExist = Test-Path .\rsm-server$s
        if($serverExist -eq $false)
        {
            # New-Item -ItemType Directory -Path .\rsm-server$s
            Write-Host "Creating new server $s"
            $srcFiles = ".\rsm-files\server"
            $destSrc = ".\rsm-server$s"
            Copy-Item -Path $srcFiles\ -Destination $destSrc -Recurse -Force
        }
        else {
            Write-Output "server $s allready exist, skipping"
        }
        
        if($s -ge $maxservers)
        {
            Write-Output "Max total servers are 5, stopping"
            break;
        }
    }
}