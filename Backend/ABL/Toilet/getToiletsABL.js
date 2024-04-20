const {MISSING_PARAMETERS_CODE, INVALID_TOKEN_CODE, SERVER_ERROR_CODE, ALL_OK_CODE} = require("../../Values/response-codes");
const {isTokenValid} = require("../../Helpers/tokenHelper");
const {getToiletsInRadius} = require("../../Helpers/toiletsHelper");

async  function getToilets(req, res){
    const {token, latitude, longitude, radius} = req.body;
    if(token === undefined || latitude === undefined || longitude === undefined || radius === undefined){
        return res.sendStatus(MISSING_PARAMETERS_CODE);
    }

    let tokenCheck = await  isTokenValid(token);
    if(!tokenCheck){
        return  res.sendStatus(INVALID_TOKEN_CODE);
    }

    let toilets = await  getToiletsInRadius(latitude,longitude,radius);
    if(toilets === undefined){
        return  res.sendStatus(SERVER_ERROR_CODE);
    }
    return  res.sendStatus(ALL_OK_CODE).json(toilets);
}

module.exports = {
    getToilets
}