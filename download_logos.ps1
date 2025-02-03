# Learning platform logo URLs
$logos = @{
    'coursera' = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Coursera_logo.svg/300px-Coursera_logo.svg.png'
    'udacity' = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Udacity_logo.svg/300px-Udacity_logo.svg.png'
    'edx' = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/EdX_logo.svg/300px-EdX_logo.svg.png'
    'pluralsight' = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Pluralsight_logo.svg/300px-Pluralsight_logo.svg.png'
}

# Create directory if it doesn't exist
$logoDir = 'C:\Users\Admin\TRIBAL PORTFOLIO\assets\images\learning-platforms'
if (!(Test-Path -Path $logoDir)) {
    New-Item -ItemType Directory -Path $logoDir
}

# Download logos
foreach ($name in $logos.Keys) {
    $url = $logos[$name]
    $outputPath = Join-Path -Path $logoDir -ChildPath "$name-logo.png"
    
    try {
        Invoke-WebRequest -Uri $url -OutFile $outputPath
        Write-Host "Successfully downloaded $name logo"
    }
    catch {
        Write-Host "Failed to download $name logo: $_"
    }
}
