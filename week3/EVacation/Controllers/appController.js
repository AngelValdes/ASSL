(function (appController) {
    "use strict";
    appController.init = function (app) {
        var express = require("express");
        var bodyParser = require("body-parser");
        var sql = require("mssql");
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(express.static("public"));
        //render views routes
        app.get("/", function (request, response) {
            response.render("index", { title: "Welcome to E-Vacation" });
        });
        app.get("/register", function (request, response) {
            response.render("register", { title: "register"});
		});
        app.get("/login", function (request, response) {
            var error = request.session.error;
            //if (error == null) {
            //    error = "";
            //}
                response.render("login", { title: "Login", error: error});			
		});
        app.get("/tabs", function (request, response) {
            var data = request.session.data;
            //var data = request.session.data;
            response.render("tabs", { data: data });
		});

    }
})(module.exports)