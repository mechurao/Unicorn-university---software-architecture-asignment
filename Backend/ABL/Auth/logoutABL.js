const {SERVER_ERROR_CODE} = require("../../Values/response-codes");
const {deleteToken} = require("../../Helpers/tokenHelper");

async function logoutUser(req, res){
    const {token} = req.body;

    console.log(req.body);

    // missing token
    if(!token){
        return res.sendStatus(400);
    }

    try{
        // delete token
        //let del = await  deleteToken(token);
       /// if(del){return res.sendStatus(200);}
        return  res.sendStatus(SERVER_ERROR_CODE);
    }catch(err){
        console.log(`Logout error : ${err}`);
        return  res.sendStatus(SERVER_ERROR_CODE);
    }
}

module.exports = {
    logoutUser
}