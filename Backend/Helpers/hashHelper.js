const  hash = require('md5');

function hashString(val){
    console.log(val);
    return hash(val);
}

function hashMatches(hashedVal,val){
    let hashed = hashString(val);
    return hashed === hashedVal;
}

module.exports = {hashString,hashMatches}