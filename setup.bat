@echo off
echo Cleaning up old Astro files and preventing conflicts...
rmdir /s /q node_modules
rmdir /s /q .astro
del /f /q package-lock.json
del /f /q astro.config.mjs

echo Removing old Astro folders to prevent Next.js crashes...
rmdir /s /q src\pages
rmdir /s /q src\components
rmdir /s /q src\layouts
rmdir /s /q src\styles
del /f /q src\content\config.ts
del /f /q tailwind.config.mjs

echo.
echo Installing Next.js and new dependencies...
call npm install --no-fund --no-audit

echo.
echo Starting Next.js development server...
call npm run dev

pause
