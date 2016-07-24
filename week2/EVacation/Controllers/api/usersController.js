(function (usersController) {
    "use strict";
    usersController.init = function (app) {
		var express = require("express");
        var bodyParser = require("body-parser");
        var sql = require("mssql");
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(express.static("public"));
        //api data routes CRUD operations
        //Read all
        app.get("/api/users", function (request, response) {
            var sqlRequest = new sql.Request();
            sqlRequest.query("SELECT id, first, last, email, password, createdOn, updatedOn, userTypeId, phone FROM Users",
                function (err, data) {
                    response.set("Content-Type", "application/json");
                    response.send(data);
                }
            );
        });	
        //Read by id
        app.get("/api/users/:id", function (request, response) {
            var id = request.params.id;
            var sqlRequest = new sql.Request();
            sqlRequest.query("SELECT id, first, last, email, password, createdOn, updatedOn, userTypeId, phone FROM Users WHERE Id = '" + id + "'", function (err, data) {
                response.set("Content-Type", "application/json");
                response.send(data);
            });
        });	
        //Create
        app.post("/api/users", function (request, response) {			
            var first = request.body.first;
            var last = request.body.last;
            var email = request.body.email;
            var password = request.body.password;
            var sqlRequest = new sql.Request();
            sqlRequest.query("INSERT INTO Users (first, last, email, password, createdOn, userTypeId) VALUES ('" + first + "', '" + last + "','" + email + "', '" + password + "','7/8/2016 9:57:00 PM', 1); SELECT @@IDENTITY;",
                function (err, data) {
                    //response.send([201, null, null]);
                }
            );
            //remove this and return success or error
            response.redirect('/'); 
        });
        //update
        app.put("/api/users/:id", function (request, response) {
            var id = request.params.id;
            var first = request.body.first;
            var last = request.body.last;
            var email = request.body.email;
            var password = request.body.password;
            var sqlRequest = new sql.Request();
            sqlRequest.query("UPDATE Users SET first = " + first + ", last = " + last + ", email = " + email + ", password = " + password + ", userTypeId = 1 WHERE Id = " + id,
                function (err, data) {
                    //response.send([200, null, null]);
                }
            );
            //remove this and return success or error
            response.redirect('/');
        });
        //Delete
        app.delete("/api/users/:id", function (request, response) {
            var id = request.params.id;
            var sqlRequest = new sql.Request();
            sqlRequest.query("DELETE FROM Users WHERE Id = " + id,
                function (err, data) {
                    //response.send([200, null, null]);
                }
            );
        });	
    }
})(module.exports)