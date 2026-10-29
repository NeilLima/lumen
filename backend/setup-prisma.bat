@echo off
cd /d C:\Users\victor\Documents\GitHub\lumen\backend
set PORT=3003
call node dist\main.js 1>verify-server.log 2>&1
