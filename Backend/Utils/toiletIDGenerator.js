const {generateToken} = require("./tokenGenerator");
const  TID_LENGTH = 20;

function generateTID(){
    return generateToken(TID_LENGTH);
}


module.exports = {
    generateTID
}