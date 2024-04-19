const {MISSING_PARAMETERS_CODE, INVALID_TOKEN_CODE, NOT_FOUND_CODE, SERVER_ERROR_CODE, ALL_OK_CODE} = require("../../Values/response-codes");
const {isTokenValid, getUidFromToken} = require("../../Helpers/tokenHelper");
const {getToilet} = require("../../Helpers/toiletsHelper");
const {addRating} = require("../../Helpers/ratingHelper");

function inputValid(rating){
    return !(rating.rating === undefined || rating.text === undefined);

}

async function addToiletRating(req, res){
    const {token, tID,rating} = req.body;
    if(token === undefined || tID === undefined || !inputValid(rating)){
        return res.sendStatus(MISSING_PARAMETERS_CODE);
    }

    let tokenCheck = await isTokenValid(token);
    if(!tokenCheck){
        return res.sendStatus(INVALID_TOKEN_CODE);
    }

    let uID = await getUidFromToken(token);
    if(uID === undefined){
        return res.sendStatus(INVALID_TOKEN_CODE);
    }

    let checkToilet = await  getToilet(tID);
    if(checkToilet === undefined){return res.sendStatus(NOT_FOUND_CODE);}

    let addQuery = await  addRating(tID,uID,rating);
    if(!addQuery){
        return res.sendStatus(SERVER_ERROR_CODE);
    }
    return res.sendStatus(ALL_OK_CODE);
}

module.exports = {
    addToiletRating
}