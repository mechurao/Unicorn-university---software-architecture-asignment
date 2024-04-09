const {hashString} = require("./hashHelper");
const {performAppQuery} = require("./dbHelper");
const {INSERT_PASSWORD_QUERY, GET_PASSWORD_QUERY, UPDATE_PASSWORD_QUERY, DELETE_PASSWORD_QUERY} = require("../Values/dbQueries");

async function saveUserPassword(uID, password){
    let hash = hashString(password);
    let res = await  performAppQuery(INSERT_PASSWORD_QUERY,[uID,hash]);
    return res !== undefined;
}

async function getUserPassword(uID){
    return await  performAppQuery(GET_PASSWORD_QUERY,[uID]);
}

async function updateUserPassword(uID, newPassword){
    let hash = hashString(newPassword);
    let res = await  performAppQuery(UPDATE_PASSWORD_QUERY,[uID, hash]);
    return res !== undefined;
}

async function deleteUserPassword(uID){
    let res = await  performAppQuery(DELETE_PASSWORD_QUERY,[uID]);
    return res !== undefined;
}

module.exports = {
    saveUserPassword,
    getUserPassword,
    updateUserPassword,
    deleteUserPassword
}