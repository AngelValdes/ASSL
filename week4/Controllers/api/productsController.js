(function (productsController) {
    "use strict";
    productsController.init = function (app) {
        var bodyParser = require("body-parser");
		var sql = require("mssql");
		app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
      

		//api data routes CRUD operations		
        //Read all
        app.get("/api/products", function (request, response) {
            var sqlRequest = new sql.Request();
            sqlRequest.query("SELECT * FROM ProductsServices",
                function (err, data) {
                    response.set("Content-Type", "application/json");
                    response.send(data);
                }
            );
        });	
        
    }
})(module.exports)