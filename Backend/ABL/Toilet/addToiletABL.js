const {MISSING_PARAMETERS_CODE, SERVER_ERROR_CODE, INVALID_TOKEN_CODE, ALL_OK_CODE} = require("../../Values/response-codes");
const {ToiletType} = require("../../Enums/toiletType");
const {isTokenValid} = require("../../Helpers/tokenHelper");
const {generateTID} = require("../../Utils/toiletIDGenerator");
const {saveToilet} = require("../../Helpers/dbHelper");


function inputValid(token, toilet){
    if(token === undefined || toilet === undefined){
        return false;
    }

    if(toilet.name === undefined ||
        toilet.type === undefined ||
        toilet.description === undefined ||
        toilet.location === undefined ||
        toilet.location.lat === undefined ||
        toilet.location.lng === undefined
    ){
        return false;
    }


    if(toilet.type === ToiletType.code){
        if(toilet.code === undefined){
            return false;
        }
    }
    if(toilet.type === ToiletType.paid){
        if(toilet.price === undefined){
            return false;
        }
        if(toilet.price.amount === undefined || toilet.price.currency === undefined){
            return false;
        }
    }
    return true;
}

async  function addToilet(req, res){
    const {token,toilet} = req.body;

    // input parameters check
    if(!inputValid(token,toilet)){
        console.log("missing parameters");
        console.log("token : "+token);
        console.log("toilet : "+JSON.stringify(toilet));
        return res.sendStatus(MISSING_PARAMETERS_CODE);
    }

    // validate user token
    if(!await isTokenValid(token)){
        console.log("invalid token");
        return res.sendStatus(INVALID_TOKEN_CODE);
    }

    // generate toilet id
    let tID = generateTID();

    // insert data
    let insert = await  saveToilet(tID, toilet);

    if(!insert){
        return res.sendStatus(SERVER_ERROR_CODE);
    }
    res.sendStatus(ALL_OK_CODE);
}

module.exports = {addToilet}