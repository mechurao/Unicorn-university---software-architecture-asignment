const {isEmailRegistred, saveUserEmail} = require("../../Helpers/emailHelper");
const {generateUID} = require("../../Utils/uidGenerator");
const {generateToken} = require("../../Utils/tokenGenerator");
const {saveUserToken} = require("../../Helpers/tokenHelper");
const {saveUser} = require("../../Helpers/userAccountHelper");
const {hashString} = require("../../Helpers/hashHelper");
const {createUserAccount} = require("../../Helpers/dbHelper");
const { EMAIL_REGISTERED_CODE, SERVER_ERROR_CODE} = require("../../Values/response-codes");
async function signUpUser(req, res) {
    const {username,email, password} = req.body;

    try{
        if(!email || !password || !password){
            return res.status(400).send({error: 'missing credentials'});
        }

        // check email
        let mailRegistered = await isEmailRegistred(email);
        console.log(mailRegistered);
        if(mailRegistered){return res.sendStatus(EMAIL_REGISTERED_CODE)}

        // generate uID
        let uID = generateUID();
        let token = generateToken();
        let hash = hashString(password);
        let acc = await createUserAccount(uID,username,email,hash,token);
        if(!acc){
            console.log("Failed creating user");
            return res.sendStatus(SERVER_ERROR_CODE);
        }

        return res.status(200).json({
            "token": token
        });

    }catch (err){
        console.log(err);
        return res.sendStatus(SERVER_ERROR_CODE);
    }


}

module.exports = {
    signUpUser
}