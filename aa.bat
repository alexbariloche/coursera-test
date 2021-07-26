echo "running aa.bat"
@call "C:\Program Files (x86)\Microsoft Visual Studio\2019\Enterprise\VC\Auxiliary\Build\vcvarsall.bat" x64 %*
set CWD=%cd%
cd %CWD%\\mca\\windows\\
echo "in dir of interest"
type main.cpp
cd %CWD%
cmd /c echo %date:~-4%%date:~4,2%%date:~7,2%.%time:~0,2%%time:~3,2%%time:~6,2%