const {MISSING_PARAMETERS_CODE, INVALID_TOKEN_CODE, SERVER_ERROR_CODE, ALL_OK_CODE} = require("../../Values/response-codes");
const {isTokenValid} = require("../../Helpers/tokenHelper");
const {getToiletsInRadius} = require("../../Helpers/toiletsHelper");

async  function getToilets(req, res){
    const {token, location, radius} = req.body;
    if(token === undefined ||  location === undefined || radius === undefined){
        console.log("missing parameters");
        if(token === undefined){console.log("token");}
        if(location === undefined){console.log("location");}
        if(radius === undefined){console.log("radius");}
        return res.sendStatus(MISSING_PARAMETERS_CODE);
    }
    const latitude = location.lat;
    const longitude = location.lng;
    if(latitude === undefined || longitude === undefined){
        console.log("missing location parameters");
        if(latitude === undefined){console.log("latitude");}
        if(longitude === undefined) {
            console.log("longitude");
        }
        console.log(location);
        return res.sendStatus(MISSING_PARAMETERS_CODE);
    }

    let tokenCheck = await  isTokenValid(token);
    if(!tokenCheck){
        console.log("Invalid token");
        return  res.sendStatus(INVALID_TOKEN_CODE);
    }

    let toilets = await  getToiletsInRadius(latitude,longitude,radius);
    if(toilets === undefined){
        console.log("Toilets loading error");
        return  res.sendStatus(SERVER_ERROR_CODE);
    }
    return res.status(ALL_OK_CODE).json(toilets);

}

module.exports = {
    getToilets
}