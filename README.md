# User Authentication System
This is a simple registration / login system created using Node.js, PostgreSQL and Express. Follow the instructions below to set up and run the application.

**Note: I used Visual Studio Code and pgAdmin 4 to implement the system.**
[Download link](https://drive.google.com/file/d/1ZNYbUdeuSXCHerH4_6fjrTI5hiphnGt8/view?usp=sharing) to a version with node modules.

## Setup Instruction
Make sure you have the following installed on your machine:

\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*
\
— Node.js LTS: [Download](https://nodejs.org/en)
\
— PostgreSQL: [Download](https://www.postgresql.org/download/)
\
— (Optional) pgAdmin 4: [Download](https://www.pgadmin.org/download/)
\
— (Optional) Visual Studio Code: [Download](https://code.visualstudio.com/)
\
\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

If you're experiencing troubles with dependencies, make sure they're installed. In Visual Studio Code they can be installed through the terminal.
\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*
\
— `npm install pg`
\
— `npm install express`
\
— `npm install bcrypt`
\
— `npm init -y`
\
— `npm install body-parser`
\
\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

---

1. Create a new PostgreSQL database. Make sure your PostgreSQL server matches connection details in 'server.js'. 
    - In 'server.js', the important details are: **'host', 'user', 'port', 'database', 'password'.**
    - In pgAdmin 4: **Servers -> Right click on 'YourServerName' -> Properties -> Connection.**
2. Create a new PostgreSQL table. Open **Tools -> Query Tool** and run the following:
\
`CREATE TABLE users (`
\
`    id SERIAL PRIMARY KEY,`
\
`    username VARCHAR(50) UNIQUE NOT NULL,`
\
`    password VARCHAR(100) NOT NULL`
\
`);`
\
You can name the table according to your personal preferences. Make sure that the name of your table matches with the commands in `server.js`.
2. The default port is set as '4000'. You're free to change it to your personal preferences in `server.js` ('const port = yourport').
3. Run the application through Node.js:
    - `node server.js`

The server will start running at `http://localhost:yourport` (default: `http://localhost:4000`).

## Using the login and registration system
- Access the login page through your web browser *(`http://localhost:yourport`)*.
- Click on *"Create it"* to switch to the registration form.
- Click on *"Login"* to switch back to the login form.
- The application will return ***'Username already exists.'*** if there's already a registered account with this username.
- The application will return ***'Wrong username / password. Try again.'*** if you entered wrong credentials.
- The application will return your username and hashed password the way they were added to your PostgreSQL database if the registration is successful.
- For 

## Troubleshooting
If you're encountering error `EADDRINUSE: address already in use :::4000`, do the following:

### On Windows:
1. Open the Command Prompt.
2. Run the following command to find the process ID (PID) using your port: `netstat -ano | find "yourport"`.
3. Use the following command to kill the process: `taskkill /F /PID <PID>`. (Replace <PID> with the actual process ID you obtained.)
4. Try running your Node.js application again using: `node server.js`.

### On Linux:
1. Open the terminal.
2. Run the following command to find the process ID (PID) using your port: `lsof -i :yourport`.
3. Use the following command to kill the process: `kill -9 <PID>`. (Replace <PID> with the actual process ID you obtained.)
4. Try running your Node.js application again using: `node server.js`.

---

For any other issues:
- Ensure that all applications and dependencies are installed.
- Ensure that PostgreSQL and `server.js` are running.
- Ensure that the connection details in `server.js` match with your PostgreSQL server.
