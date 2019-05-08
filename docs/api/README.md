Rest API
===============

Default port: 4500

Examples used with postman

```
Get request (/api/server/:id)
Content-Type: application/x-www-form-urlencoded
headers: apikey key
url: http://localhost:4500/api/server/1
```
```
{
    "id": 1,
    "dir": "serverfiles",
    "serverip": "0.0.0.0",
    "serverport": "28015",
    "rconip": "127.0.0.1",
    "rconport": "28016",
    "rconpassword": "rconpassword1",
    "maxplayers": "100",
    "hostname": "Test server 1",
    "identity": "rustserver",
    "level": "Procedural Map",
    "uselevelurl": "0",
    "levelurl": "",
    "seed": "12345",
    "worldsize": "4000",
    "saveinterval": "300",
    "headerimage": "",
    "serverurl": "",
    "update": "1",
    "forceupdate": "0",
    "wipe": "0",
    "oxide": "1",
    "branch": "public",
    "lastwipe": "",
    "custom": "",
    "title": "My Server"
}
```
Update hostname:

```
Put request (/api/server/:id/:name)
Content-Type: application/x-www-form-urlencoded
headers: apikey key
url: http://localhost:4500/api/server/1/hostname
```

Relay Rcon command

```
Post request (/api/server/:id/rcon)
Content-Type: application/x-www-form-urlencoded
Headers: apikey: key
Body: value: say Hello World
Url: http://localhost:4500/api/server/1/rcon
```

Powershell script:

```
$url = "http://localhost:4500/api/server/1/rcon"
$body = @{
    value = "restart 300"
}
$header = @{
    "apikey"="your key here"
}

$result = Invoke-WebRequest -Uri $url -ContentType "application/x-www-form-urlencoded" -Method POST -Body $body -Headers $header
```