# Killer Mutant Robogotchis 🤖👽👾
https://trilogy-project-2.herokuapp.com/

## Functionality 💪
#### Here's how the app works: 
1. First users get to choose their Robogotchi. By picking a robot, alien or human and choosing a name a character will be randomly generated for them. 

2. After choosing their 'gotchi they will then be asked to fill out an authentication form with name, email and password. 

3. Once account is created, user will be taken to a page with their health points and option to feed, entertain or exercise their 'gotchi. 

4. Overtime the hunger, boredom and laziness will grow as their health points decrease. When you feed, entertain or exercise your 'gotchi their overall health will increase as their hunger, boredom and laziness goes back down. 

## Getting Started 🏁

These instructions will get you a copy of the project up and running on your local machine for grading and testing purposes. 

1. Clone repository. Click on the clone button next to the repository (clone with SSH). 
2. Open Terminal and git clone (paste) into directory of your choice. 
3. Open folder in VS Code. 
4. The `config` folder holds each of the database objects, one for the deployed app, one for testing and one for JAWSDB which is necessary for the heroku connection. Also contains `middleware` and `passport.js`file which holds the authentication logic.
5. Inside of the `models` folder is the `gotchi.js` with the intial table data, and the `index.js` which connects to the database using sequelize. 
6. The `schema.sql` holds the timers needed for automatically updating the MYSQL table by incrementing the health of the 'gotchis. 
7. The `apiRoutes.js` holds validation logic and connects to the database where the `htmlRoutes.js` sends information from the database to the front end of the application. 
8. `public` holds the assets, css, images and the javascript connecting to the html
9. The `views` folder has all of handlebars files, which replaces html and displays the information to the user. 
10. `server.js` connects the app to the server and the correct port.

## Pre-Requisites ✔️

1. Node - use this site to install node into your computer: https://nodejs.org/en/download/
    *to check if node is installed type node -v into your terminal. If installed it will print the version number on the screen.
2. NPM (https://www.npmjs.com/) - Node Package Manager. Use this site to assist in downloading packages or modules. 

## Built With 🔧

* [Node] (https://nodejs.org/en/download/) - As an asynchronous event driven JavaScript runtime, Node is designed to build scalable network applications. 
* [Javascript] (https://www.javascript.com/) - JavaScript is the programming language of HTML and the Web
* [JSON] (https://www.json.org/) - Javascript object notation, syntax for storing and exchanging information. 
* [Express] (https://www.npmjs.com/package/express) - Node.js web app framework designed to make developing websites, web apps, & API's much easier.
* [MySQL] (https://www.mysql.com/) - Open source relational database management system (RDBMS) based on Structured Query Language (SQL)
* [Sequelize] - (https://sequelize.readthedocs.io/en/v3/) - Connects objects with relational database systems. 
* [Handlebars] (https://handlebarsjs.com/) - Handlebars allows you to separate the generation of HTML from the rest of your JavaScript and write cleaner code.
* [MVC] - (https://www.geeksforgeeks.org/mvc-design-pattern/) - The Model-View-Controller is an architectural pattern that separates an application into three main logical components: the model, the view, and the controller.
* [PassportJs] - (http://www.passportjs.org/) - Authentication middleware for NodeJS. 
* [Heroku] - (https://www.heroku.com/) - A cloud based platform that lets companies build, deliver, monitor and scale applications.
 

## Authors ⌨️

*** Andy Hardy *** - [ahardy42](https://github.com/ahardy42)
<br>
*** Joey Kubalak *** - [TreezCode](https://github.com/TreezCode)
<br>
*** Kyle Knox *** - [KyleK86](https://github.com/KyleK86)
<br>
*** Amanda Dovel *** - [amandadovel](https://github.com/amandadovel)
<br>

## Acknowledgments 🌟

Free Stock Footage by: 
<a href="http://www.videezy.com">Videezy</a>
