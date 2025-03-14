color 0A
echo off
cls

REM Create a virtual environment called wenv if it doesn't exist
if not exist wenv (
    echo Creating virtual environment...
    python -m venv wenv
)

REM Activate the virtual environment
call wenv\Scripts\activate

REM Check if PyInstaller is installed in the virtual environment
pip show pyinstaller >nul 2>&1
if %errorlevel% neq 0 (
    echo PyInstaller is not installed. Installing PyInstaller...
    pip install pyinstaller
)

REM Compile the Python script to a binary
pyinstaller --onefile post_export.py

REM Move the compiled binary to the same location as this script
if exist dist\post_export.exe (
    echo "Moving the compiled binary to %~dp0"
    move dist\post_export.exe %~dp0
    echo Compilation successful. The binary is located in the same folder as this script.
) else (
    echo Compilation failed.
)

REM Remove the build, dist folders and the .spec file
if exist build (
    rmdir /s /q build
)
if exist dist (
    rmdir /s /q dist
)
if exist post_export.spec (
    del post_export.spec
)

REM Deactivate the virtual environment
deactivate
