# witfive
WIT hackathon


	1) Navigate to xampp
	2) Double click xampp-control
	3) Click start  against mysql


In command prompt navigate to xampp folder: and cd mysql/bin

<path_to_xampp>\xampp\mysql\bin>mysql -u root

	Ø Show databases;
	Ø Use jobsindia;
	Ø Show tables;
	
Open another command prompt:
Navigate to witfive project repo folder in local

<path_to_project_dir>\witfive> npm install

Note: There shouldnt be any error after running this command. Else, Delete 'node_modules' and 'package-lock.json' from project directory and run this command again.
 
<path_to_project_dir>\witfive> npm run start

This should run without any error and a message 'Connected' displays once the server is up and running.
Note: Mysql should be running before running 'npm run start' command'

Open chrome browser and type in URL  
localhost:8090

Click Employee for employee registration page.
Fill details, submit

You should see 'user created' message on npm console
Also verify the row inserted in mysql table
