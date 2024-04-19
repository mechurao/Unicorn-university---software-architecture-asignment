const {performDbQuery} = require("./dbHelper");
const {INSERT_TOILET_RATING_QUERY, GET_TOILET_RATINGS_QUERY} = require("../Values/dbQueries");

async function addRating(tID,uID, rating){
    let res = await  performDbQuery(INSERT_TOILET_RATING_QUERY,[tID, uID, rating.rating, rating.text]);
    return res !== undefined ;
}

async function getToiletRatings(tID){
    return await performDbQuery(GET_TOILET_RATINGS_QUERY, [tID]);
}

module.exports = {
    addRating,
    getToiletRatings
}