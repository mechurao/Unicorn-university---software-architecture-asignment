const {performDbQuery} = require("./dbHelper");
const {SELECT_TOILET_QUERY} = require("../Values/dbQueries");

async function getToilet(tID){
    let res = await  performDbQuery(SELECT_TOILET_QUERY,[tID]);
    if(res === undefined || res.length === 0){return null;}
    return  res[0];
}

module.exports = {
    getToilet
}