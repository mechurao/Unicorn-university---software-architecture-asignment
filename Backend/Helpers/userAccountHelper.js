const {performAppQuery} = require("./dbHelper");
const {INSERT_USER_QUERY, DELETE_USER_QUERY, GET_USER_QUERY} = require("../Values/dbQueries");

async function saveUser(uID,username){
    let res = await performAppQuery(INSERT_USER_QUERY,[uID, username]);
    return res !== undefined;
}

async function deleteUser(uID){
    let res = await  performAppQuery(DELETE_USER_QUERY,[uID]);
    return res !== undefined;
}

async function getUserData(uID){
    return await performAppQuery(GET_USER_QUERY, [uID]);
}

module.exports = {
    saveUser,
    deleteUser,
    getUserData
}