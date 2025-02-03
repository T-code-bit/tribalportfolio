# Portfolio Performance Audit and Optimization

# Require administrator privileges
$currentUser = [Security.Principal.WindowsIdentity]::GetCurrent()
$principal = New-Object Security.Principal.WindowsPrincipal($currentUser)
if (-not $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Host "Please run as Administrator" -ForegroundColor Red
    exit
}

# Performance Optimization Functions
function Optimize-CSS {
    Write-Host "🔍 Analyzing CSS Performance" -ForegroundColor Cyan
    $cssFiles = Get-ChildItem -Path ".\styles" -Recurse -Include *.css
    
    foreach ($file in $cssFiles) {
        Write-Host "Optimizing: $($file.Name)" -ForegroundColor Green
        & npx cssnano $file.FullName "$($file.DirectoryName)\$($file.BaseName).min.css"
    }
}

function Optimize-JavaScript {
    Write-Host "🚀 Compressing JavaScript" -ForegroundColor Cyan
    $jsFiles = Get-ChildItem -Path ".\scripts" -Recurse -Include *.js
    
    foreach ($file in $jsFiles) {
        Write-Host "Minifying: $($file.Name)" -ForegroundColor Green
        & npx terser $file.FullName --compress --mangle -o "$($file.DirectoryName)\$($file.BaseName).min.js"
    }
}

function Run-LighthouseAudit {
    Write-Host "📊 Running Lighthouse Performance Audit" -ForegroundColor Cyan
    & lighthouse https://T-code-bit.github.io/tribalportfolio/ `
        --view `
        --output-path="performance_report.html" `
        --preset=desktop `
        --only-categories=performance,accessibility,best-practices
}

function Analyze-NetworkPerformance {
    Write-Host "🌐 Network Performance Analysis" -ForegroundColor Cyan
    $url = "https://T-code-bit.github.io/tribalportfolio/"
    
    $result = Invoke-WebRequest -Uri $url
    
    Write-Host "Page Load Time: $($result.Headers['X-Response-Time']) ms" -ForegroundColor Green
    Write-Host "Content Size: $($result.RawContentLength) bytes" -ForegroundColor Green
}

# Main Execution
try {
    # Ensure required tools are installed
    npm install -g lighthouse cssnano terser

    Optimize-CSS
    Optimize-JavaScript
    Run-LighthouseAudit
    Analyze-NetworkPerformance

    Write-Host "🎉 Performance Optimization Complete!" -ForegroundColor Green
}
catch {
    Write-Host "❌ Performance Audit Failed: $_" -ForegroundColor Red
}
