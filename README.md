quizwiz-js
==========

Demonstration of JavaScript full stack development with WebDriver, jQuery, Express and Sequelize

Getting started:
---------------

Pre-requisities:
* Git
* NodeJS
* PostgreSQL
* Recommended: Growl

Steps
1. git clone the repository
2. npm install
   * You will probably get an error message, this is not fatal
3. Create databases
   * CREATE ROLE quizwiz WITH PASSWORD 'quizwiz';
   * CREATE DATABASE quizwiz_dev;
   * CREATE DATABASE quizwiz_test;
3. npm run webtest runs the web tests
4. npm run servertest runs the server tests
5. npm start starts the server
