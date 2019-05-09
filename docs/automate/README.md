Automate Examples
===============

Automate weekly wipe with Windows Task Scheduler

- Restart and set wipe to 1
```
# schedule_weekly_wipe.ps1 
$url = "http://localhost:4500/api/server/1/rcon"
$body = @{
    value = "restart 300"
}
$url2 = "http://localhost:4500/api/server/1/wipe"
$body2 = @{
    value = "1"
}
$header = @{
    "apikey"="your api key here"
}
$result = Invoke-WebRequest -Uri $url -ContentType "application/x-www-form-urlencoded" -Method POST -Body $body -Headers $header

$result = Invoke-WebRequest -Uri $url2 -ContentType "application/x-www-form-urlencoded" -Method PUT -Body $body2 -Headers $header
```

- Update wipe to 0
```
# wipe_off.ps1
$url = "http://localhost:4500/api/server/1/wipe"
$body = @{
    value = "0"
}
$header = @{
    "apikey"="your api key here"
}

$result = Invoke-WebRequest -Uri $url -ContentType "application/x-www-form-urlencoded" -Method PUT -Body $body -Headers $header
```

- Create a task scheduler 
```
1. Open Task Scheduler and click "Create basic task"
2. Give it a name
3. Select when you want the task to start, i select weekly.
4. Set time you want it to run
5. Start a program
6. program: powershell.exe and arguments: -ExecutionPolicy Bypass C:\RustSM\schedule_weekly_wipe.ps1
7. Test it so you know it works by right click -> Run

Create several task to run different scripts
```

![task-scheduler](https://i.altirust.no/s/cLfTXWQw12hFLJO.gif "Create a schedule task")

![task-scheduler](https://i.altirust.no/s/jixhrlWB464yxZx.gif "Run a task")