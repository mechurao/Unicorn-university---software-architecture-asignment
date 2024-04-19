const {generateToken} = require("./tokenGenerator");
const  UID_LENGTH = 100;

function generateUID(){
    return generateToken(UID_LENGTH);
}

module.exports = {generateUID}