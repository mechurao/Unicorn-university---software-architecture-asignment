const {hashString} = require("./hashHelper");
const { performDbQuery} = require("./dbHelper");
const {INSERT_PASSWORD_QUERY, GET_PASSWORD_QUERY, UPDATE_PASSWORD_QUERY, DELETE_PASSWORD_QUERY} = require("../Values/dbQueries");

async function saveUserPassword(uID, password){
    let hash = hashString(password);
    let res = await  performDbQuery(INSERT_PASSWORD_QUERY,[uID,hash]);
    return res !== undefined;
}

async function getUserPassword(uID){
    return await  performDbQuery(GET_PASSWORD_QUERY,[uID]);
}

async function updateUserPassword(uID, newPassword){
    let hash = hashString(newPassword);
    let res = await  performDbQuery(UPDATE_PASSWORD_QUERY,[uID, hash]);
    return res !== undefined;
}

async function deleteUserPassword(uID){
    let res = await  performDbQuery(DELETE_PASSWORD_QUERY,[uID]);
    return res !== undefined;
}

module.exports = {
    saveUserPassword,
    getUserPassword,
    updateUserPassword,
    deleteUserPassword
}