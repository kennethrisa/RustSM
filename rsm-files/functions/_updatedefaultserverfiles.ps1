function UpdateDefaultServerFiles () {
    $srcFiles = "..\rsm-files\server"
    $destSrc = ".\"
    Copy-Item -Path $srcFiles\* -Destination $destSrc -Recurse -Force
}