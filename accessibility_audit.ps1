# Portfolio Accessibility Audit Script

# Run axe-core accessibility tests
Write-Host "Running Accessibility Audit..." -ForegroundColor Cyan

# Ensure you have axe-core and puppeteer installed
# npm install -g @axe-core/cli puppeteer

& axe https://T-code-bit.github.io/tribalportfolio/ --exit

# Generate detailed accessibility report
& axe https://T-code-bit.github.io/tribalportfolio/ --save accessibility_report.json

Write-Host "Accessibility Audit Complete!" -ForegroundColor Green
Write-Host "Review accessibility_report.json for detailed insights." -ForegroundColor Yellow
