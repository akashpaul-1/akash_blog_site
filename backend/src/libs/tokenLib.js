const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const secretKey = process.env.ENC_KEY;
const config = require('../../config/appConfig');
const encLib = require('./encLib');


const generateToken = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const claims = {
        jwtid: uuidv4(),
        iat: Date.now(),
        exp: Math.floor(Date.now() / 1000) + config.sessionExpTime,
        sub: 'auth_token',
        data: data
      };
      let jwt_signature = jwt.sign(claims, secretKey);
      jwt_signature = encLib.encrypt2(jwt_signature);
      resolve(jwt_signature);
    } catch (err) {
      reject(err);
    }
  });
};

const verifyClaim = (token, secret, cb) => {
  try {
    token = encLib.decrypt(token);
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        cb(err, null);
      }
      else {
        cb(null, decoded);
      }
    });
  } catch (error) {
    return new Error('Invalid token');
  }
};

const verifyClaimWithoutSecret = (token) => {
  return new Promise((resolve, reject) => {
    try {
      token = encLib.decrypt2(token);
      jwt.verify(token, secretKey, function (err, decoded) {
        if (err) {
          reject(err);
        }
        else {
          resolve(decoded);
        }
      });
    } catch (error) {
      reject(new Error('Invalid token'));
    }
  });
};

module.exports = {
  generateToken: generateToken,
  verifyToken: verifyClaim,
  verifyClaimWithoutSecret: verifyClaimWithoutSecret
};