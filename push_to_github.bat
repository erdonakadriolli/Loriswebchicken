@echo off
echo ==================================================
echo Duke bere push ne GitHub...
echo ==================================================
cd /d "%~dp0"

echo [1/4] Duke shtuar skedaret...
git add .

echo [2/4] Duke krijuar commit...
git commit -m "Initial commit - Loris web project"

echo [3/4] Duke konfiguruar branch main...
git branch -M main

echo [4/4] Duke bere push ne GitHub...
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo [!] Nese repo ne GitHub ka permbajtje ekzistuese, po bejme rebase...
    git pull origin main --rebase
    git push -u origin main
)

echo.
echo ==================================================
echo Procesi perfundoi! Shtyp cdo tast per ta mbyllur.
echo ==================================================
pause
