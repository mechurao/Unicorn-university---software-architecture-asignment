const { performDbQuery} = require("./dbHelper");
const {GET_EMAIL_QUERY, INSERT_EMAIL_QUERY, UPDATE_EMAIL_QUERY, DELETE_EMAIL_QUERY, GET_UID_BY_EMAIL_QUERY,
    CHECK_EMAIL_QUERY
} = require("../Values/dbQueries");

async function getEmail(uID){
    return await performDbQuery(GET_EMAIL_QUERY,[uID]);
}

async function saveUserEmail(uID,email){
    let query = await  performDbQuery(INSERT_EMAIL_QUERY,[uID,email]);
    return query !== undefined;
}

async function isEmailRegistred(email) {
    let res = await performDbQuery(CHECK_EMAIL_QUERY, [email]);
    return res && res.length > 0;
}

async function updateEmail(uID, email){
    let res = await  performDbQuery(UPDATE_EMAIL_QUERY,[uID,email]);
    return !res !== undefined;
}

async function deleteEmail(uID){
    let res = await  performDbQuery(DELETE_EMAIL_QUERY, [uID]);
    return res !== undefined;
}

module.exports = {
    saveUserEmail,
    isEmailRegistred,
    updateEmail,
    deleteEmail,
    getEmail
}