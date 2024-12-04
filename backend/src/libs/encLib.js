const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const password = process.env.ENC_KEY;
const iv = process.env.IV;



const encrypt = (plaintext) => {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(password), Buffer.from(iv))
    let crypted = Buffer.concat([cipher.update(Buffer.from(plaintext)), cipher.final()]);
    return crypted;
}



const decrypt = (hash) => {

    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(password), Buffer.from(iv));

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash, 'base64')), decipher.final()]);

    return decrpyted.toString();
};

const encrypt2 = (data) => {
    const IV = Buffer.from(iv, 'hex'); //crypto.randomBytes(16);
    // const Securitykey = Buffer.from(password, 'hex');
    const Securitykey = crypto.createHash('sha256').update(password).digest();
    const cipher = crypto.createCipheriv(algorithm, Securitykey, IV);
    let encryptedData = cipher.update(data, 'utf-8', 'hex');
    encryptedData += cipher.final('hex');
    return encryptedData;
};

const decrypt2 = (hashed_data) => {
    const IV = Buffer.from(iv, 'hex'); //crypto.randomBytes(16);
    // const Securitykey = Buffer.from(password, 'hex');
    const Securitykey = crypto.createHash('sha256').update(password).digest();
    const decipher = crypto.createDecipheriv(algorithm, Securitykey, IV);
    let decryptedData = decipher.update(hashed_data, 'hex', 'utf-8');
    decryptedData += decipher.final('utf8');
    return decryptedData;
};

module.exports = {
    encrypt: encrypt,
    decrypt: decrypt,
    encrypt2,
    decrypt2,
}