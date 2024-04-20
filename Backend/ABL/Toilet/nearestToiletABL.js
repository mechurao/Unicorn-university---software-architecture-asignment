const {MISSING_PARAMETERS_CODE, INVALID_TOKEN_CODE, NOT_FOUND_CODE, ALL_OK_CODE} = require("../../Values/response-codes");
const {isTokenValid} = require("../../Helpers/tokenHelper");
const {getNearestToilet} = require("../../Helpers/toiletsHelper");

async function findNearestToilet(req,res){
    const {token, latitude, longitude} = req.body;
    if(token === undefined || latitude === undefined || longitude === undefined){
        return res.sendStatus(MISSING_PARAMETERS_CODE);
    }
    let tokenCheck = await isTokenValid(token);
    if(!tokenCheck){
        return  res.sendStatus(INVALID_TOKEN_CODE);
    }

    let result = await  getNearestToilet(latitude, longitude);
    if(result === undefined){
        return  res.sendStatus(NOT_FOUND_CODE);
    }
    return  res.sendStatus(ALL_OK_CODE).json(result);
}

module.exports = {
    findNearestToilet
}