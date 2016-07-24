//configure web sever
var Http = require("http");
var Express = require("express");
var session = require('express-session');
var App = Express();
App.use(session({ secret: 'ssshhhhh', resave: true, saveUninitialized: true}));
//session configuration
//App.use(Express.cookieParser());
//App.use(Express.session({ secret: '1234567890QWERTY' }));


//configure sql connection
var Sql = require("mssql");
var Config = {
	user: 'angelvaldes',
	password: 'password@1',
	server: 'angelvaldes.database.windows.net',
	database: 'EVacation',
	pool: {
		max: 10,
		min: 0,
		idleTimeoutMillis: 60000
	},
	options: {
		encrypt: true 
	}
}
Sql.connect(Config, function(err) {
    console.log(err);
});
//configure view engine
App.set("view engine", "vash");
//configure public folder
App.use(Express.static(__dirname + "/public"));
//configure controllers hub
var Controllers = require("./Controllers/index");
Controllers.init(App);
//initialize server and listen to port
var Server = Http.createServer(App);
Server.listen(3000);