@echo off
echo ================================
echo  Health Focus — Next.js Setup
echo ================================
echo.

echo Installing dependencies...
call npm install --no-fund --no-audit

echo.
echo Starting Next.js development server...
call npm run dev

pause
