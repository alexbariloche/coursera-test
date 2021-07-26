echo "running aa.bat"
@call "c:\Program Files (x86)\Microsoft Visual Studio\2019\Community\VC\Auxiliary\Build\vcvarsall.bat" x64 %*
cd .\\mca\\windows
echo "in dir of interest"
type main.cpp
dir C:\\Program Files (x86)