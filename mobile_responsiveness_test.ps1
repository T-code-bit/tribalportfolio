# Mobile Responsiveness Testing Script

# Require administrator privileges for browser control
$currentUser = [Security.Principal.WindowsIdentity]::GetCurrent()
$principal = New-Object Security.Principal.WindowsPrincipal($currentUser)
if (-not $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Host "Please run this script as an Administrator" -ForegroundColor Red
    exit
}

# Check for required browsers
$browsers = @{
    "Chrome" = "C:\Program Files\Google\Chrome\Application\chrome.exe"
    "Firefox" = "C:\Program Files\Mozilla Firefox\firefox.exe"
    "Edge" = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
}

# Function to test responsiveness
function Test-Responsiveness {
    param([string]$BrowserPath)
    
    if (-not (Test-Path $BrowserPath)) {
        Write-Host "Browser not found: $BrowserPath" -ForegroundColor Yellow
        return
    }

    # Device sizes to test
    $devices = @(
        @{Name="iPhone SE"; Width=375; Height=667},
        @{Name="iPhone 12/13 Pro"; Width=390; Height=844},
        @{Name="Samsung Galaxy S21"; Width=360; Height=800},
        @{Name="iPad Mini"; Width=768; Height=1024}
    )

    foreach ($device in $devices) {
        Write-Host "Testing ${device.Name} (${device.Width}x${device.Height})" -ForegroundColor Cyan
        
        # Open mobile test HTML with specific window size
        Start-Process $BrowserPath -ArgumentList "file:///c:/Users/Admin/TRIBAL%20PORTFOLIO/mobile_test.html", 
            "--window-size=$($device.Width),$($device.Height)",
            "--start-fullscreen"
    }
}

# Test with available browsers
foreach ($browser in $browsers.GetEnumerator()) {
    Test-Responsiveness -BrowserPath $browser.Value
}

Write-Host "Mobile Responsiveness Testing Complete" -ForegroundColor Green
Write-Host "Check each browser window for layout and functionality" -ForegroundColor Yellow
