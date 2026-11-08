@echo off
cd /d C:\Users\victor\Documents\GitHub\lumen\backend
call npm install @nestjs/config @nestjs/jwt @nestjs/passport passport passport-jwt bcryptjs class-validator class-transformer @prisma/client
call npm install -D prisma @types/passport-jwt @types/bcryptjs
call npx prisma generate
call npx prisma db push
echo DONE > install-status.txt
