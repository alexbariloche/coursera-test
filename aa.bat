echo "running aa.bat"
@call "C:\Program Files (x86)\Microsoft Visual Studio\2019\Enterprise\VC\Auxiliary\Build\vcvarsall.bat" x64 %*
cd .\\mca\\windows
echo "in dir of interest"
type main.cpp