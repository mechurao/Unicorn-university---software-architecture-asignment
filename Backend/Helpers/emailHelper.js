const {performAppQuery} = require("./dbHelper");
const {GET_EMAIL_QUERY, INSERT_EMAIL_QUERY, UPDATE_EMAIL_QUERY, DELETE_EMAIL_QUERY, CHECK_EMAIL_QUERY} = require("../Values/dbQueries");

async function saveUserEmail(uID,email){
    let query = await  performAppQuery(INSERT_EMAIL_QUERY,[uID,email]);
    return query !== undefined;
}

async function isEmailRegistred(email) {
    let res = await performAppQuery(CHECK_EMAIL_QUERY, [email]);
    return res && res.length > 0;
}

async function updateEmail(uID, email){
    let res = await  performAppQuery(UPDATE_EMAIL_QUERY,[uID,email]);
    return !res !== undefined;
}

async function deleteEmail(uID){
    let res = await  performAppQuery(DELETE_EMAIL_QUERY, [uID]);
    return res !== undefined;
}

module.exports = {
    saveUserEmail,
    isEmailRegistred,
    updateEmail,
    deleteEmail
}