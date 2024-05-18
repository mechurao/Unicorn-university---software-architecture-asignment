const {isTokenValid} = require("../../Helpers/tokenHelper");

async function checkToken(req, res){
    const {token} = req.body;
    if(!token){
        return  res.sendStatus(400);
    }
    let valid = await  isTokenValid(token);
    if(valid){
        return res.sendStatus(200);
    }
    return res.sendStatus(500);
}

module.exports= {
    checkToken
}