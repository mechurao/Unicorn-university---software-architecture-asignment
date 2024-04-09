const  TOKEN_LENGTH = 40;

function generateToken(length){
    if(length === undefined){length = TOKEN_LENGTH;}
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-?.!';
    return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
}

module.exports = {generateToken}