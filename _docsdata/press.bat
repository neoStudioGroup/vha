@echo off

set docsdata=%cd%\_docsdata\.vuepress\dist
set docs=%cd%\docs

cd /d %docs%
del /s /q /f *.*
for /d %%i in (*) do rd /s /q "%%i"
cd ..

echo copyform %docsdata% to %docs%
xcopy %docsdata% %docs% /s /e /Q /Y /I

REM pause
exit