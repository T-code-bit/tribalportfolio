# Navigation System Comprehensive Test Script

# Require administrator privileges
$currentUser = [Security.Principal.WindowsIdentity]::GetCurrent()
$principal = New-Object Security.Principal.WindowsPrincipal($currentUser)
if (-not $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Host "Please run as Administrator" -ForegroundColor Red
    exit
}

# Test Configuration
$testPages = @(
    "index.html",
    "about.html",
    "skills.html", 
    "projects.html",
    "contact.html"
)

$testBrowsers = @{
    "Chrome" = "C:\Program Files\Google\Chrome\Application\chrome.exe"
    "Firefox" = "C:\Program Files\Mozilla Firefox\firefox.exe"
    "Edge" = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
}

# Mobile Device Emulation Sizes
$deviceSizes = @(
    @{Name="iPhone SE"; Width=375; Height=667},
    @{Name="Samsung Galaxy S21"; Width=360; Height=800},
    @{Name="iPad Mini"; Width=768; Height=1024}
)

function Test-NavigationFunctionality {
    param(
        [string]$BrowserPath,
        [hashtable]$DeviceSize = $null
    )

    Write-Host "🌐 Testing Navigation in $($BrowserPath | Split-Path -Leaf)" -ForegroundColor Cyan

    foreach ($page in $testPages) {
        $fullPath = "file:///c:/Users/Admin/TRIBAL%20PORTFOLIO/$page"
        
        # Determine browser arguments
        $arguments = @(
            $fullPath,
            "--start-maximized"
        )

        # Add device emulation if specified
        if ($DeviceSize) {
            $arguments += @(
                "--window-size=$($DeviceSize.Width),$($DeviceSize.Height)",
                "--user-agent=Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1"
            )
        }

        Write-Host "📄 Testing Page: $page" -ForegroundColor Green

        # Launch browser with specific configuration
        Start-Process $BrowserPath -ArgumentList $arguments

        # Wait a moment to load
        Start-Sleep -Seconds 2
    }
}

# Comprehensive Navigation Test
function Invoke-NavigationTest {
    Write-Host "🚀 Starting Comprehensive Navigation Test" -ForegroundColor Magenta

    # Desktop Browser Tests
    foreach ($browser in $testBrowsers.GetEnumerator()) {
        if (Test-Path $browser.Value) {
            Test-NavigationFunctionality -BrowserPath $browser.Value
        } else {
            Write-Host "❌ Browser not found: $($browser.Key)" -ForegroundColor Yellow
        }
    }

    # Mobile Device Emulation Tests
    foreach ($browser in $testBrowsers.GetEnumerator()) {
        if (Test-Path $browser.Value) {
            foreach ($device in $deviceSizes) {
                Write-Host "📱 Testing Mobile Emulation: $($device.Name)" -ForegroundColor Blue
                Test-NavigationFunctionality -BrowserPath $browser.Value -DeviceSize $device
            }
        }
    }

    Write-Host "✅ Navigation Test Complete" -ForegroundColor Green
    Write-Host "Please verify:" -ForegroundColor Yellow
    Write-Host "1. All pages load correctly" -ForegroundColor White
    Write-Host "2. Navigation menu appears/functions on mobile" -ForegroundColor White
    Write-Host "3. Links work across different browsers" -ForegroundColor White
}

# Run the test
Invoke-NavigationTest

# Optional: Generate Test Report
function Generate-NavigationTestReport {
    $reportPath = "c:\Users\Admin\TRIBAL PORTFOLIO\navigation_test_report.txt"
    $report = @"
TRIBAL Portfolio - Navigation System Test Report
================================================
Date: $(Get-Date)
Browsers Tested: $($testBrowsers.Keys -join ', ')
Mobile Devices Emulated: $($deviceSizes.Name -join ', ')

Test Criteria:
- Page Load Verification
- Navigation Menu Responsiveness
- Link Functionality
- Cross-Browser Compatibility
- Mobile Emulation Support

Recommendation: Manually verify test results
"@

    $report | Out-File $reportPath
    Write-Host "📋 Test report generated: $reportPath" -ForegroundColor Cyan
}

Generate-NavigationTestReport
