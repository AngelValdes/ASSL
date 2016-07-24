//configure web sever
var Http = require("http");
var Express = require("express");
var App = Express();
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