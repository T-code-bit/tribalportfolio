# Portfolio Deployment Script

# Set Git configuration
& "C:\Program Files\Git\cmd\git.exe" config --global user.name "Portfolio Owner"
& "C:\Program Files\Git\cmd\git.exe" config --global user.email "portfolio@example.com"

# Initialize Git repository
& "C:\Program Files\Git\cmd\git.exe" init

# Add all files
& "C:\Program Files\Git\cmd\git.exe" add .

# Commit changes
& "C:\Program Files\Git\cmd\git.exe" commit -m "Initial deployment of portfolio website"

# Add remote repository (replace with your GitHub username)
& "C:\Program Files\Git\cmd\git.exe" remote add origin https://github.com/yourusername/tribal-portfolio.git

# Rename branch to main
& "C:\Program Files\Git\cmd\git.exe" branch -M main

# Push to GitHub
& "C:\Program Files\Git\cmd\git.exe" push -u origin main

Write-Host "Deployment completed successfully!"
