@echo off

echo copyform %cd%\docs\_data\.vuepress\dist to %cd%\docs
xcopy %cd%\docs\_data\.vuepress\dist %cd%\docs /s /e /Q /Y /I

exit