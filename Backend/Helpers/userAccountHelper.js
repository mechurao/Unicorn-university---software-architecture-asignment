const { performDbQuery} = require("./dbHelper");
const {INSERT_USER_QUERY, DELETE_USER_QUERY, GET_USER_QUERY} = require("../Values/dbQueries");

async function saveUser(uID,username){
    let res = await performDbQuery(INSERT_USER_QUERY,[uID, username]);
    return res !== undefined;
}

async function deleteUser(uID){
    let res = await  performDbQuery(DELETE_USER_QUERY,[uID]);
    return res !== undefined;
}

async function getUserData(uID){
    return await performDbQuery(GET_USER_QUERY, [uID]);
}

module.exports = {
    saveUser,
    deleteUser,
    getUserData
}