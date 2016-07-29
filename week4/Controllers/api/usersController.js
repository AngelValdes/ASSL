(function (usersController) {
    "use strict";
    usersController.init = function (app) {
        var bodyParser = require("body-parser");
		var sql = require("mssql");
		var nodemailer = require('nodemailer');
		app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

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
            var sess = request.session;
			var email = request.body.email;
            var password = request.body.password;
            var sqlRequest = new sql.Request();
            sqlRequest.query("SELECT id, first, last, email, password, createdOn, updatedOn, userTypeId, rtrim(phone) as phone FROM Users WHERE Email= '" + email + "' AND Password= '" + password + "'",
                function (err, data) {                  
                    sess.message = "";
                    if (data[0] != null || data[0] != undefined) {
                        sess.data = data[0];
                    } else {
                        sess.error = "Invalid login!";
                        response.redirect('/login');
                    }
                });
            sqlRequest = new sql.Request();
            sqlRequest.query("SELECT id, name, description, price FROM ProductsServices",
                function (err, data) {
                    sess.message = "";
                    if (data[0] != null || data[0] != undefined) {
                        sess.data.products = data;
                        response.redirect('/tabs');
                    } else {
                        sess.error = "Invalid login!";
                        response.redirect('/login');
                    }
                });
		});

		//Recover password
		app.post("/api/forgotpassword", function (request, response) {
			var email = request.body.email;
			var sqlRequest = new sql.Request();
			sqlRequest.query("SELECT id, first, last, email, password, createdOn, updatedOn, userTypeId, rtrim(phone) as phone FROM Users WHERE Email= '" + email + "'",
                function (err, data) {
				var sess = request.session;
                sess.message = "";
                //compose email message if user found
				if (data[0] != null || data[0] != undefined) {
					sess.data = data[0];
					var transporter = nodemailer.createTransport('smtps://elainesq88%40gmail.com:tkierobebe88@smtp.gmail.com');
					var mailOptions = {
						from: '<elainesq88@gmail.com>', // sender address
						to: email, // list of receivers
						subject: 'E-Vacation reset password ☘'
, // Subject line
						//text: 'Hello world 🐴', // plaintext body
						html: '<h4>E-Vacation</h4><p>To reset your password please <a href="http://localhost:3000/resetpassword/'+sess.data.id+'">click here</a></p>' // html body
					};
					transporter.sendMail(mailOptions, function (error, info) {
						if (error) {
							return console.log(error);
						}
						console.log('Message sent: ' + info.response);
					});
					response.redirect('/login');
				} else {
					sess.error = "Invalid email!";
					response.redirect('/');
				}
			});
		});

        app.post("/api/resetpassword/:id", function(request, response) {
            var id = request.params.id;
            var password = request.body.password;
            var sess = request.session;
            var sqlRequest = new sql.Request();
            sqlRequest.query("UPDATE Users SET password = '" + password + "' WHERE Id = " + id,
                function(err, data) {
                    //response.send([200, null, null]);
                    sqlRequest.query("SELECT id, first, last, email, password, createdOn, updatedOn, userTypeId, rtrim(phone) as phone FROM Users WHERE Id = '" + id + "'", function(erro, datao) {
                        
                        //sess.message = "";
                        if (datao[0] != null || datao[0] != undefined) {
                            sess.data = datao[0];
                            sess.message = "Password reset successfully";
                            //response.redirect('/tabs');
                        } else {
                            //sess.message = "Some error ocurred";
                        }
                    });

                }
            );
            sqlRequest = new sql.Request();
            sqlRequest.query("SELECT id, name, description, price FROM ProductsServices",
                function (err, data) {
                    sess.message = "";
                    if (data[0] != null || data[0] != undefined) {
                        sess.data.products = data;
                        response.redirect('/tabs');
                    } else {
                        sess.error = "Invalid login!";
                        response.redirect('/login');
                    }
                });
        });
    }
})(module.exports)