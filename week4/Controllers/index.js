(function (controllers) {
    "use strict";    
    var usersController = require("./api/usersController");
    var productsController = require("./api/productsController");
    var appController = require("./appController");    
    controllers.init = function (app) {
        usersController.init(app);
        productsController.init(app);
        appController.init(app);
    };
})(module.exports);