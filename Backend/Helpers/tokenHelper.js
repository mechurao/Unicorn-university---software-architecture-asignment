const {performAppQuery} = require("./dbHelper");
const {GET_TOKEN_QUERY,  INSERT_TOKEN_QUERY, GET_UID_FROM_TOKEN, DELETE_USER_TOKEN_QUERY, DELETE_TOKEN_QUERY} = require("../Values/dbQueries");

async function getUserTokens(uID){
    return await  performAppQuery(GET_TOKEN_QUERY,[uID]);
}

async function deleteUserToken(uID){
    let res = await performAppQuery(DELETE_USER_TOKEN_QUERY,[uID]);
    return res !== undefined;
}

async function deleteToken(token){
    let res = await performAppQuery(DELETE_TOKEN_QUERY,[token]);
    return res !== undefined;
}

async function saveUserToken(uID, token){
    let res = await  performAppQuery(INSERT_TOKEN_QUERY,[uID,token]);
    return res !== undefined;
}
async function getUidFromToken(token){
    let res = await  performAppQuery(GET_UID_FROM_TOKEN,[token]);
    if(!res || res.length === 0){return undefined;}
    return  res[0].uID;
}

async function isTokenValid(token){
    let res = await  getUidFromToken(token);
    if(res === undefined) {

    }
    return res !== undefined;
}

module.exports = {
    getUserTokens,
    deleteUserToken,
    deleteToken,
    saveUserToken,
    getUidFromToken,
    isTokenValid
}