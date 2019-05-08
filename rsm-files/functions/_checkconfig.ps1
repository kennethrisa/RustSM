function CheckConfig {
    $config = ".\rsm\config\config.ps1"
    $configExist = Test-Path -path $config
    if($configExist -eq $False) {
        
        GetApiFromBackend
    }
}