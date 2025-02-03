# Portfolio Deployment Script with Enhanced Error Handling

# Parameters that can be passed externally
param(
    [string]$githubUsername = $env:GITHUB_USERNAME,
    [string]$repositoryName = $env:REPOSITORY_NAME
)

# Enable detailed error logging
$ErrorActionPreference = 'Stop'

try {
    # If no username provided, prompt interactively
    if ([string]::IsNullOrWhiteSpace($githubUsername)) {
        Write-Host "🌐 GitHub Deployment Setup" -ForegroundColor Cyan
        Write-Host "Please enter your GitHub username exactly as it appears on GitHub." -ForegroundColor Yellow
        Write-Host "Example: If your GitHub profile is https://github.com/johndoe, enter 'johndoe'" -ForegroundColor Green
        
        $githubUsername = Read-Host "Enter GitHub Username"
        $repositoryName = "tribal-portfolio"
    }
cd "c:\Users\Admin\TRIBAL PORTFOLIO"
& "C:\Program Files\Git\cmd\git.exe" remote remove origin
& "C:\Program Files\Git\cmd\git.exe" remote add origin "https://github.com/T-code-bit/tribalportfolio.git"
& "C:\Program Files\Git\cmd\git.exe" push -u origin main
    # Validate GitHub username
    if ([string]::IsNullOrWhiteSpace($githubUsername)) {
        throw "GitHub username cannot be empty. Please provide your GitHub username."
    }

    # Set Git configuration with error handling
    & "C:\Program Files\Git\cmd\git.exe" config --global user.name "Portfolio Owner" 2>$null
    & "C:\Program Files\Git\cmd\git.exe" config --global user.email "portfolio@example.com" 2>$null

    # Initialize Git repository
    & "C:\Program Files\Git\cmd\git.exe" init

    # Stage all files with detailed logging
    & "C:\Program Files\Git\cmd\git.exe" add .
    if ($LASTEXITCODE -ne 0) {
        throw "Git staging failed"
    }

    # Commit changes with timestamp
    $commitMessage = "Portfolio deployment - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    & "C:\Program Files\Git\cmd\git.exe" commit -m $commitMessage

    # Add remote repository dynamically
    $remoteUrl = "https://github.com/$githubUsername/$repositoryName.git"
    & "C:\Program Files\Git\cmd\git.exe" remote add origin $remoteUrl

    # Rename branch to main
    & "C:\Program Files\Git\cmd\git.exe" branch -M main

    # Push to GitHub with verbose output
    & "C:\Program Files\Git\cmd\git.exe" push -u origin main -v

    # Success message with deployment URL
    Write-Host "🚀 Deployment Successful!" -ForegroundColor Green
    Write-Host "Portfolio URL: https://$githubUsername.github.io/$repositoryName/" -ForegroundColor Cyan
}
catch {
    Write-Host "❌ Deployment Failed: $_" -ForegroundColor Red
    Write-Host "Please check your:" -ForegroundColor Yellow
    Write-Host "1. GitHub username" -ForegroundColor Yellow
    Write-Host "2. Internet connection" -ForegroundColor Yellow
    Write-Host "3. Git installation" -ForegroundColor Yellow
}
