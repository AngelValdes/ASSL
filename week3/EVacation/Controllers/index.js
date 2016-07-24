(function (controllers) {
    "use strict";    
    var usersController = require("./api/usersController");
    var appController = require("./appController");    
    controllers.init = function (app) {
        usersController.init(app);
        appController.init(app);
    };
})(module.exports);  