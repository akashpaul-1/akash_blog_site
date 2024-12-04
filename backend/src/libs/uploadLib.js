const fs = require("fs");
const AWS = require("aws-sdk");
const appConfig = require("../../config/appConfig");
// Initializing S3 Interface
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY_S3,
});

const putFileUrl = (key) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: key,
      Expires: appConfig.urlExpTime,
    };
    s3.getSignedUrl("putObject", params, (err, url) => {
      if (err) {
        reject(err);
      } else {
        resolve(url);
      }
    });
  });
};

const getFileUrl = (key) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: key,
      Expires: appConfig.urlExpTime,
    };
    s3.getSignedUrl("getObject", params, (err, url) => {
      if (err) {
        reject(err);
      } else {
        resolve(url);
      }
    });
  });
};

const uploadToS3 = async (file, key) => {
  const fileContent = fs.readFileSync(file.path);
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    Body: fileContent,
    ContentType: file.mimetype,
  };
  try {
    await s3.upload(params).promise();
    let url = `https://${process.env.BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    console.log("url => ", url);
    return url !== null && url !== undefined ? url : "";
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteFromS3 = async (objectUrl) => {
  const key = objectUrl.split('/').pop();
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
  };
  try {
    await s3.deleteObject(params).promise();
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

module.exports = {
  putFileUrl: putFileUrl,
  getFileUrl: getFileUrl,
  uploadToS3: uploadToS3,
  deleteFromS3: deleteFromS3
};
