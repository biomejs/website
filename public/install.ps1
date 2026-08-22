<#
Biome Installer
#>

[CmdletBinding()]
param(
	[Alias("h")]
	[switch] $Help,

	[Alias("v")]
	[string] $Version = [Environment]::GetEnvironmentVariable("BIOME_VERSION"),

	[Alias("f")]
	[switch] $Force,

	[switch] $NoModifyPath
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$App = "biome"
$LatestVersionUrl = "https://biomejs.dev/api/versions/latest.txt"
$ReleasesUrl = "https://github.com/biomejs/biome/releases"

function Show-Usage {
	@'
Biome Installer

Usage: install.ps1 [options]

Options:
    -Help, -h              Display this help message
    -Version, -v <version> Install a specific version
    -Force, -f             Download even if the version is already installed
    -NoModifyPath          Don't modify the user or current process PATH

Environment variables:
    BIOME_INSTALL_DIR      Installation directory
    BIOME_VERSION          Version to install

Examples:
    irm https://biomejs.dev/install.ps1 | iex

    $env:BIOME_VERSION = "2.5.9"
    irm https://biomejs.dev/install.ps1 | iex
'@
}

function Fail {
	param([string] $Message)
	throw "Biome installer: $Message"
}

function Test-PathContains {
	param(
		[string] $PathValue,
		[string] $Directory
	)

	$Target = $Directory.TrimEnd([char[]] "\/")
	foreach ($Entry in $PathValue -split ";") {
		$ExpandedEntry = [Environment]::ExpandEnvironmentVariables($Entry.Trim().Trim('"'))
		if ($ExpandedEntry.TrimEnd([char[]] "\/") -ieq $Target) {
			return $true
		}
	}

	return $false
}

function Add-ToPath {
	param([string] $Directory)

	$UserPath = [Environment]::GetEnvironmentVariable("Path", "User")
	if (-not (Test-PathContains $UserPath $Directory)) {
		$NewUserPath = if ([string]::IsNullOrWhiteSpace($UserPath)) {
			$Directory
		} else {
			"$Directory;$UserPath"
		}
		[Environment]::SetEnvironmentVariable("Path", $NewUserPath, "User")
		Write-Host "Added Biome to the user PATH: $Directory" -ForegroundColor Blue
	}

	if (-not (Test-PathContains $env:Path $Directory)) {
		$env:Path = "$Directory;$env:Path"
		Write-Host "Added Biome to the current PowerShell PATH." -ForegroundColor Blue
	}
}

if ($Help) {
	Show-Usage
	return
}

if ($env:OS -ne "Windows_NT") {
	Fail "unsupported operating system; use https://biomejs.dev/install on macOS or Linux"
}

$InstallDir = [Environment]::GetEnvironmentVariable("BIOME_INSTALL_DIR")
if ([string]::IsNullOrWhiteSpace($InstallDir)) {
	if ([string]::IsNullOrWhiteSpace($env:LOCALAPPDATA)) {
		Fail "LOCALAPPDATA is not set"
	}
	$InstallDir = Join-Path $env:LOCALAPPDATA "Biome\bin"
}
$InstallDir = [IO.Path]::GetFullPath([Environment]::ExpandEnvironmentVariables($InstallDir))

$NativeArchitecture = if (-not [string]::IsNullOrWhiteSpace($env:PROCESSOR_ARCHITEW6432)) {
	$env:PROCESSOR_ARCHITEW6432
} else {
	$env:PROCESSOR_ARCHITECTURE
}

$Architecture = switch ($NativeArchitecture.ToUpperInvariant()) {
	"AMD64" { "x64" }
	"ARM64" { "arm64" }
	default { Fail "unsupported architecture: $NativeArchitecture" }
}

[Net.ServicePointManager]::SecurityProtocol =
	[Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12

if ([string]::IsNullOrWhiteSpace($Version)) {
	try {
		$Version = (Invoke-RestMethod -UseBasicParsing -Uri $LatestVersionUrl).ToString().Trim()
	} catch {
		Fail "failed to fetch the latest Biome version: $($_.Exception.Message)"
	}
}

$Version = $Version.Trim()
if ($Version.StartsWith("v")) {
	$Version = $Version.Substring(1)
}
if ($Version.StartsWith("@biomejs/biome@")) {
	$Version = $Version.Substring("@biomejs/biome@".Length)
}
if ($Version -notmatch "^[0-9A-Za-z.-]+$") {
	Fail "invalid version: $Version"
}

$Filename = "biome-win32-$Architecture.exe"
$ReleaseTag = "@biomejs/biome@$Version"
$DownloadUrl = "$ReleasesUrl/download/$ReleaseTag/$Filename"
$BinaryPath = Join-Path $InstallDir "$App.exe"

if (-not $Force -and (Test-Path -LiteralPath $BinaryPath -PathType Leaf)) {
	try {
		$InstalledVersion = ((& $BinaryPath --version 2>$null) | Out-String).Trim()
		$InstalledVersion = $InstalledVersion -replace "^Version:\s*", ""
		if ($InstalledVersion -eq $Version) {
			Write-Host "`nBiome version $Version is already installed at $BinaryPath`n" -ForegroundColor Blue
			if (-not $NoModifyPath) {
				Add-ToPath $InstallDir
			}
			return
		}
	} catch {
		# Replace an unreadable or incompatible existing binary.
	}
}

New-Item -ItemType Directory -Path $InstallDir -Force | Out-Null
$TempDir = Join-Path $InstallDir (".biome-install-" + [Guid]::NewGuid().ToString("N"))
$TempBinary = Join-Path $TempDir "$App.exe"

Write-Host "`nInstalling Biome version: $Version" -ForegroundColor Blue
Write-Host "Platform: win32-$Architecture`n" -ForegroundColor Blue

try {
	New-Item -ItemType Directory -Path $TempDir | Out-Null
	$SuppressProgress = $PSVersionTable.PSVersion.Major -eq 5
	if ($SuppressProgress) {
		# Progress rendering makes Invoke-WebRequest extremely slow in Windows PowerShell 5.1.
		$PreviousProgressPreference = $ProgressPreference
		$ProgressPreference = "SilentlyContinue"
	}
	try {
		Invoke-WebRequest -UseBasicParsing -Uri $DownloadUrl -OutFile $TempBinary
	} catch {
		Fail "failed to download Biome $Version; see $ReleasesUrl"
	} finally {
		if ($SuppressProgress) {
			$ProgressPreference = $PreviousProgressPreference
		}
	}

	Unblock-File -LiteralPath $TempBinary
	Move-Item -LiteralPath $TempBinary -Destination $BinaryPath -Force
} finally {
	if (Test-Path -LiteralPath $TempDir) {
		Remove-Item -LiteralPath $TempDir -Recurse -Force -ErrorAction SilentlyContinue
	}
}

if (-not $NoModifyPath) {
	Add-ToPath $InstallDir
}

$Banner = @'
#^^# ^#^ #^^# #_ _# #^^
#^^_  #  #  # # # #^^
^^^  ^^^ ^^^^ ^   ^ ^^^
'@
$Banner = $Banner.Replace([char] "#", [char] 0x2588)
$Banner = $Banner.Replace([char] "^", [char] 0x2580)
$Banner = $Banner.Replace([char] "_", [char] 0x2584)

Write-Host "`n$Banner" -ForegroundColor Blue
Write-Host ""
Write-Host "Biome $Version installed successfully." -ForegroundColor Blue
Write-Host "Binary: " -NoNewline -ForegroundColor Blue
Write-Host $BinaryPath
Write-Host "`nRun " -NoNewline
Write-Host "biome --help" -NoNewline -ForegroundColor Blue
Write-Host " to get started.`n"
Write-Host "`nLearn more at " -NoNewline
Write-Host "https://biomejs.dev" -ForegroundColor Blue
Write-Host ""
