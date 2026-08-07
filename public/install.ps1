#!/usr/bin/env pwsh
param (
    [string]$Version
)

$ErrorActionPreference = "Stop"

function Get-LatestStableVersion {
    $response = Invoke-RestMethod -Uri "https://registry.npmjs.org/@biomejs%2Fbiome" -UseBasicParsing
    return $response."dist-tags".latest
}

if (-not $Version) {
    $Version = Get-LatestStableVersion
    if (-not $Version) {
        Write-Error "Failed to retrieve the latest stable version."
        exit 1
    }
}

# Detect CPU architecture
$arch = $env:PROCESSOR_ARCHITECTURE.ToLower()

switch ($arch) {
    "amd64"  { $target = "win32-x64.exe" }
    "arm64"  { $target = "win32-arm64.exe" }
    default  {
        Write-Error "Unsupported architecture: $arch"
        exit 1
    }
}

# Version tag format
if ($Version -like '1.*') {
    $tag = "cli%2Fv$Version"
} else {
    $tag = "@biomejs/biome@$Version"
}

# Install directory
$installDir = Join-Path $Home ".biome\bin"
New-Item -ItemType Directory -Force -Path $installDir | Out-Null

# Path to executable
$biomePath = Join-Path $installDir "biome.exe"

# Remove existing binary if locked
if (Test-Path $biomePath) {
    try {
        Remove-Item $biomePath -Force
    }
    catch {
        Write-Error "Cannot update Biome because the binary is currently in use. Please close any running instances of Biome and try again."
        exit 1
    }
}

# Download the binary
$biomeUrl = "https://github.com/biomejs/biome/releases/download/$tag/biome-$target"
Invoke-WebRequest -Uri $biomeUrl -OutFile $biomePath -UseBasicParsing -Verbose

Write-Host "Biome installed successfully to $biomePath"

# Check if installDir is in PATH
$pathEntries = $env:PATH -split ';'
if ($pathEntries -notcontains $installDir) {
    Write-Host "$installDir is NOT in PATH"
    $answer = Read-Host "Do you want to add $installDir to your PATH? (Y/n)"

    if ($answer -eq "Y" -or $answer -eq "y" -or [string]::IsNullOrWhiteSpace($answer)) {
        $oldPath = [Environment]::GetEnvironmentVariable("PATH", "User")
        $newPath = if ($oldPath) { "$oldPath;$installDir" } else { $installDir }
        [Environment]::SetEnvironmentVariable("PATH", $newPath, "User")
        Write-Host "Added $installDir to PATH. Restart your terminal or log out/in to apply changes."
    } else {
        Write-Host "Please add $installDir to your PATH manually."
    }
}
