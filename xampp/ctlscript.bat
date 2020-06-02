@echo off
rem START or STOP Services
rem ----------------------------------
rem Check if argument is STOP or START

if not ""%1"" == ""START"" goto stop

if exist F:\Vani\xampp\hypersonic\scripts\ctl.bat (start /MIN /B F:\Vani\xampp\server\hsql-sample-database\scripts\ctl.bat START)
if exist F:\Vani\xampp\ingres\scripts\ctl.bat (start /MIN /B F:\Vani\xampp\ingres\scripts\ctl.bat START)
if exist F:\Vani\xampp\mysql\scripts\ctl.bat (start /MIN /B F:\Vani\xampp\mysql\scripts\ctl.bat START)
if exist F:\Vani\xampp\postgresql\scripts\ctl.bat (start /MIN /B F:\Vani\xampp\postgresql\scripts\ctl.bat START)
if exist F:\Vani\xampp\apache\scripts\ctl.bat (start /MIN /B F:\Vani\xampp\apache\scripts\ctl.bat START)
if exist F:\Vani\xampp\openoffice\scripts\ctl.bat (start /MIN /B F:\Vani\xampp\openoffice\scripts\ctl.bat START)
if exist F:\Vani\xampp\apache-tomcat\scripts\ctl.bat (start /MIN /B F:\Vani\xampp\apache-tomcat\scripts\ctl.bat START)
if exist F:\Vani\xampp\resin\scripts\ctl.bat (start /MIN /B F:\Vani\xampp\resin\scripts\ctl.bat START)
if exist F:\Vani\xampp\jetty\scripts\ctl.bat (start /MIN /B F:\Vani\xampp\jetty\scripts\ctl.bat START)
if exist F:\Vani\xampp\subversion\scripts\ctl.bat (start /MIN /B F:\Vani\xampp\subversion\scripts\ctl.bat START)
rem RUBY_APPLICATION_START
if exist F:\Vani\xampp\lucene\scripts\ctl.bat (start /MIN /B F:\Vani\xampp\lucene\scripts\ctl.bat START)
if exist F:\Vani\xampp\third_application\scripts\ctl.bat (start /MIN /B F:\Vani\xampp\third_application\scripts\ctl.bat START)
goto end

:stop
echo "Stopping services ..."
if exist F:\Vani\xampp\third_application\scripts\ctl.bat (start /MIN /B F:\Vani\xampp\third_application\scripts\ctl.bat STOP)
if exist F:\Vani\xampp\lucene\scripts\ctl.bat (start /MIN /B F:\Vani\xampp\lucene\scripts\ctl.bat STOP)
rem RUBY_APPLICATION_STOP
if exist F:\Vani\xampp\subversion\scripts\ctl.bat (start /MIN /B F:\Vani\xampp\subversion\scripts\ctl.bat STOP)
if exist F:\Vani\xampp\jetty\scripts\ctl.bat (start /MIN /B F:\Vani\xampp\jetty\scripts\ctl.bat STOP)
if exist F:\Vani\xampp\hypersonic\scripts\ctl.bat (start /MIN /B F:\Vani\xampp\server\hsql-sample-database\scripts\ctl.bat STOP)
if exist F:\Vani\xampp\resin\scripts\ctl.bat (start /MIN /B F:\Vani\xampp\resin\scripts\ctl.bat STOP)
if exist F:\Vani\xampp\apache-tomcat\scripts\ctl.bat (start /MIN /B /WAIT F:\Vani\xampp\apache-tomcat\scripts\ctl.bat STOP)
if exist F:\Vani\xampp\openoffice\scripts\ctl.bat (start /MIN /B F:\Vani\xampp\openoffice\scripts\ctl.bat STOP)
if exist F:\Vani\xampp\apache\scripts\ctl.bat (start /MIN /B F:\Vani\xampp\apache\scripts\ctl.bat STOP)
if exist F:\Vani\xampp\ingres\scripts\ctl.bat (start /MIN /B F:\Vani\xampp\ingres\scripts\ctl.bat STOP)
if exist F:\Vani\xampp\mysql\scripts\ctl.bat (start /MIN /B F:\Vani\xampp\mysql\scripts\ctl.bat STOP)
if exist F:\Vani\xampp\postgresql\scripts\ctl.bat (start /MIN /B F:\Vani\xampp\postgresql\scripts\ctl.bat STOP)

:end

