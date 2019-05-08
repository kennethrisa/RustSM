[CmdletBinding()]
param (
    [string]$command
 )

<#
.SYNOPSIS
    RustSM - A Rust Server Management
    To start this server dobbel click on startserver.bat
.DESCRIPTION
    RustSM is an easy why to handle your server from discord/restapi to restart / update or wipe the server without login into server.
.NOTES
    File Name   : server.ps1
    Author      : Kenna - https://umod.org/user/kenna - github: https://github.com/kennethrisa
.LINK
    Script posted on:
    https://github.com/kennethrisa/RustSM
#>
$functionFile = "..\rsm-files\functions\_functions.ps1"
. $functionFile
Commands
