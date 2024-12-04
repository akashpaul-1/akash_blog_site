const userController = require("../controllers/userController");
const appConfig = require("../../config/appConfig");
const auth = require("../middlewares/auth");

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}`;

    app.post(`${baseUrl}/sign-up`,userController.signupHandler);

}