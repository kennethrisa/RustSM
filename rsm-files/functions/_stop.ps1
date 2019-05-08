function StopServer () {
    $config = ".\rsm\config\config.ps1"
    . $config
    $url = "$apiurl/rcon"
    $body = @{
        value = "quit"
    }
    $header = @{
        "apikey"=$apikey
    }
    $result = Invoke-WebRequest -Uri $url -ContentType "application/x-www-form-urlencoded" -Method POST -Body $body -Headers $header
    Write-Host "Trying to send quit command"
}
function KillServer () {
    $process = "RustDedicated"
    $proc = Get-Process $process -ErrorAction SilentlyContinue | Where-Object{ $_.Path -like "*server$serverid*" } | Select-Object Id, Path
    if($proc) {
        Write-Host "Killing server"
        $proc | Stop-Process -Force
    }
    else {
        Write-Host "Server is not running"
    }
}