@echo off

set aOpt=/D
set aApp=%1
set aDir=%~dp0%
set RunAsAdmin=C:\Home\_0\EXEs\nirCmdc.exe elevatecmd execmd

 if "%aApp%" == "" set aApp=app2c

                    echo  In %aDir% 
                    echo  Linking "%aApp%\public\*" to "node_modules\admin-lte\dist"
    %RunAsAdmin%  mkLink  %aOpt%  "%aApp%\public\dist"    "%aDir%node_modules\admin-lte\dist"
    %RunAsAdmin%  mkLink  %aOpt%  "%aApp%\public\plugins" "%aDir%node_modules\admin-lte\plugins"

