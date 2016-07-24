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
            sqlRequest.query("SELECT id, first, last, email, password, createdOn, updatedOn, userTypeId, rtrim(phone) as phone FROM Users",
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
            sqlRequest.query("SELECT id, first, last, email, password, createdOn, updatedOn, userTypeId, rtrim(phone) as phone FROM Users WHERE Id = '" + id + "'", function (err, data) {
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
        app.post("/api/users/:id", function (request, response) {
            var id = request.params.id;
            var first = request.body.first;
            var last = request.body.last;
            var email = request.body.email;
			var password = request.body.password;
			var phone = request.body.phone;
            var sqlRequest = new sql.Request();           
            sqlRequest.query("UPDATE Users SET first = '" + first + "', last = '" + last + "', email = '" + email + "', password = '" + password + "', phone = '" + phone + "',userTypeId = 1 WHERE Id = " + id,
                function (err, data) {
                    //response.send([200, null, null]);
                    sqlRequest.query("SELECT id, first, last, email, password, createdOn, updatedOn, userTypeId, rtrim(phone) as phone FROM Users WHERE Id = '" + id + "'", function (erro, datao) {
                        var sess = request.session;
                        //sess.message = "";
                        if (datao[0] != null || datao[0] != undefined) {
                            sess.data = datao[0];
                            //sess.message = "Updated successfully";
                            response.redirect('/tabs');
                        } else {
                            //sess.message = "Some error ocurred";
                        }
                    });
                    
                }
            );
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
        //Validate user/password
        app.post("/api/login", function (request, response) {
            var email = request.body.email;
            var password = request.body.password;
            var sqlRequest = new sql.Request();
            sqlRequest.query("SELECT id, first, last, email, password, createdOn, updatedOn, userTypeId, rtrim(phone) as phone FROM Users WHERE Email= '" + email + "' AND Password= '" + password + "'",
                function (err, data) {
                    var sess = request.session;
                    sess.message = "";
                    if (data[0] != null || data[0] != undefined) {
                        sess.data = data[0];
                        response.redirect('/tabs');
                    } else {
                        sess.error = "Invalid login!";
                        response.redirect('/login');
                    }
                });
        });	
    }
})(module.exports)