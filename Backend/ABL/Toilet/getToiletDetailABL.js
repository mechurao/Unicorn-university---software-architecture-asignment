const {MISSING_PARAMETERS_CODE, INVALID_TOKEN_CODE, NOT_FOUND_CODE, SERVER_ERROR_CODE, ALL_OK_CODE} = require("../../Values/response-codes");
const {isTokenValid} = require("../../Helpers/tokenHelper");
const {getToilet, getToiletDetails} = require("../../Helpers/toiletsHelper");

async function getToiletDetail(req, res){
    const  {token, tID} = req.body;
    if(token === undefined || tID === undefined){
        return res.sendStatus(MISSING_PARAMETERS_CODE);
    }

    // check token
    let tokenCheck = await isTokenValid(token);
    if(!tokenCheck){
        return  res.sendStatus(INVALID_TOKEN_CODE);
    }

    let toilet = await getToilet(tID);
    if(toilet === undefined){
        return  res.sendStatus((NOT_FOUND_CODE));
    }

    let detail = await getToiletDetails(toilet);
    if(detail === undefined){
        return res.sendStatus(SERVER_ERROR_CODE);
    }
    return  res.sendStatus(ALL_OK_CODE).json(detail);
}

module.exports = {
    getToiletDetail
}