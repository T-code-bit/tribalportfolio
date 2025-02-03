# Portfolio Performance Optimization Script

# Minify CSS files
Get-ChildItem -Path ".\styles" -Recurse -Include *.css | ForEach-Object {
    $inputFile = $_.FullName
    $outputFile = $inputFile -replace '\.css$', '.min.css'
    
    Write-Host "Minifying CSS: $inputFile"
    & npx cssnano "$inputFile" "$outputFile"
}

# Minify JavaScript files
Get-ChildItem -Path ".\scripts" -Recurse -Include *.js | ForEach-Object {
    $inputFile = $_.FullName
    $outputFile = $inputFile -replace '\.js$', '.min.js'
    
    Write-Host "Minifying JavaScript: $inputFile"
    & npx terser "$inputFile" --compress --mangle -o "$outputFile"
}

# Generate Performance Report
Write-Host "Generating Performance Report..."
& lighthouse https://T-code-bit.github.io/tribalportfolio/ --view

Write-Host "Optimization Complete! 🚀" -ForegroundColor Green
