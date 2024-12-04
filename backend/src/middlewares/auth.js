const responseLib = require('../libs/responseLib');
const token = require('../libs/tokenLib');
const check = require('../libs/checkLib');
const appConfig = require('../../config/appConfig');

let isAuthorized = async (req, res, next) => {
  if (req.header('token') && !check.isEmpty(req.header('token'))) {
    token.verifyClaimWithoutSecret(req.header('token'),(err,decoded)=>{
        if(err){
            let apiResponse = responseLib.generate(0, `Authorization Failed : ${err.message}`, null)
            res.send(apiResponse)
        }
        else{                
            req["user"] = decoded.data;
            next()
        }
    });
  } else {
    let apiResponse = responseLib.generate(0, 'AuthorizationToken Is Missing In Request', null)
    res.send(apiResponse)
  }
}

let firebaseAuth = async (req,res,next) => {
  if (req.header('token') && !check.isEmpty(req.header('token'))) {
    try{
      let checkAuth = await appConfig.admin.auth().verifyIdToken(req.header('token'));
      next();
    }catch(err){
      let apiResponse = responseLib.generate(0, `${err.message}`, null)
      res.status(401).send(apiResponse)
    }
  } else {
    let apiResponse = responseLib.generate(0, 'AuthorizationToken Is Missing In Request', null)
    res.status(401).send(apiResponse)
  }
}

module.exports = {
  isAuthorized: isAuthorized,
  firebaseAuth:firebaseAuth
}
