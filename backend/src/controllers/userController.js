const check = require("../libs/checkLib");
const response = require("../libs/responseLib");
const appConfig = require("../../config/appConfig");
const admin = appConfig.admin;
const { v4: uuidv4 } = require('uuid');
const tokenLib = require("../libs/tokenLib");



let signupHandler = async (req,res)=>{
    try{
    }catch(err){
        let apiResponse = responseLib.generate(0, `${err.message}`, null)
        res.status(412).send(apiResponse)
    }
}



module.exports = {
    signupHandler:signupHandler
}