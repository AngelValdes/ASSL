(function (appController) {
    "use strict";
    appController.init = function (app) {
        var express = require("express");
        var bodyParser = require("body-parser");
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
            response.render("login", { title: "Login", error: error});			
		});
        app.get("/tabs", function (request, response) {
            var data = request.session.data;
            response.render("tabs", { data: data });
		});
		app.get("/forgotpassword", function (request, response) {
			var data = request.session.data;
			response.render("forgotpassword", { data: data });
		});
		app.get("/resetpassword/:id", function (request, response) {
		    var data = request.params.id;
			response.render("resetpassword", { data: data });
		});
        app.get("/testing", function (request, response) {
            response.render("testing", { data: data });
        });

    }
})(module.exports)