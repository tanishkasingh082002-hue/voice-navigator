$git = "$env:LOCALAPPDATA\Programs\MinGit\cmd\git.exe"
if (-not (Test-Path $git)) {
    Write-Host "git.exe not found at $git" -ForegroundColor Red
    exit 1
}

Write-Host "Using Git: $(& $git --version)" -ForegroundColor Green

# Add to user PATH if not present
$currentPath = [Environment]::GetEnvironmentVariable("Path", "User")
$minGitCmd = "$env:LOCALAPPDATA\Programs\MinGit\cmd"
if ($currentPath -notlike "*MinGit*") {
    [Environment]::SetEnvironmentVariable("Path", "$currentPath;$minGitCmd", "User")
    Write-Host "Added MinGit to User PATH." -ForegroundColor Green
}

# Remove temporary install script
Remove-Item ".\install-git.ps1" -Force -ErrorAction SilentlyContinue

# Initialize Git repository
if (-not (Test-Path ".\.git")) {
    & $git init -b main
    Write-Host "Initialized empty Git repository (main branch)." -ForegroundColor Green
}

# Set default user identity if not already configured
$userName = & $git config --get user.name
if (-not $userName) {
    & $git config user.name "Ucch Pratap Singh"
    & $git config user.email "ucchpratapsingh@users.noreply.github.com"
    Write-Host "Configured default Git user name and email." -ForegroundColor Cyan
}

# Stage all files
& $git add .
Write-Host "Staged files for commit." -ForegroundColor Cyan

# Commit
$status = & $git status --porcelain
if ($status) {
    & $git commit -m "feat: Dialect-Adaptive Public Scheme Voice Navigator (YojanaVaani) with testing suite"
    Write-Host "Created initial commit successfully!" -ForegroundColor Green
} else {
    Write-Host "Working tree clean, nothing to commit." -ForegroundColor Yellow
}

Write-Host "`n=== Git Status ===" -ForegroundColor Cyan
& $git status
Write-Host "`n=== Git Log ===" -ForegroundColor Cyan
& $git log -n 1 --oneline
Write-Host "`n=== Remote Repositories ===" -ForegroundColor Cyan
& $git remote -v
