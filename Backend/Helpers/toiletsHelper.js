const {performDbQuery} = require("./dbHelper");
const {SELECT_TOILET_QUERY, SELECT_TOILETS_IN_RADIUS_QUERY, SELECT_TOILET_CODE_QUERY, SELECT_TOILET_PRICE_QUERY,
    SELECT_NEAREST_TOILET_QUERY
} = require("../Values/dbQueries");
const {ToiletType} = require("../Enums/toiletType");

async function getToilet(tID){
    let res = await  performDbQuery(SELECT_TOILET_QUERY,[tID]);
    if(res === undefined || res.length === 0){return null;}
    return  res[0];
}

async function getToiletsInRadius(latitude, longitude, radius) {
    return await performDbQuery(SELECT_TOILETS_IN_RADIUS_QUERY, [longitude, latitude, radius]);
}


async function getToiletDetails(toilet){
    if (toilet.type === ToiletType.code){
        let code = await performDbQuery(SELECT_TOILET_CODE_QUERY,[toilet.tID]);
        if(code === undefined){return undefined;}
        toilet.code = code;
    }
    if(toilet.type === ToiletType.paid){
        let price = await performDbQuery(SELECT_TOILET_PRICE_QUERY,[toilet.tID]);
        if(price === undefined){return  undefined;}
        toilet.price = price;
    }
    return  toilet;
}

async function getNearestToilet(latitude, longitude){
    let res = await  performDbQuery(SELECT_NEAREST_TOILET_QUERY,[latitude,longitude]);
    if(!res || res.length === 0){return undefined;}
    return res[0];
}


module.exports = {
    getToilet,
    getToiletsInRadius,
    getToiletDetails,
    getNearestToilet
}