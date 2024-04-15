const {isEmailRegistred, saveUserEmail} = require("../../Helpers/emailHelper");
const {generateUID} = require("../../Utils/uidGenerator");
const {generateToken} = require("../../Utils/tokenGenerator");
const {saveUserToken} = require("../../Helpers/tokenHelper");
const {saveUser} = require("../../Helpers/userAccountHelper");

async function signUpUser(req, res) {
    const {username,email, password} = req.body;
    if(!email || !password){
        return res.status(400).send({error: 'email or password missing'});
    }

    // check email
    let mailRegistered = await isEmailRegistred(email);
    if(mailRegistered){res.sendStatus(EMAIL_REGISTERED_CODE)}

    // generate uID
    let uID = generateUID();

    // save email
    let saveMail = await saveUserEmail(uID,email);
    if(!saveMail){res.sendStatus(SERVER_ERROR_CODE);}

    // save user
    let saveUser = await saveUser(uID,username);
    if(!saveUser){res.sendStatus(SERVER_ERROR_CODE);}

    // generate access token
    let token = generateToken();

    // save access token
    let saveToken = await  saveUserToken(uID,token);
    if(!saveToken){res.sendStatus(SERVER_ERROR_CODE);}

    res.sendStatus(200).json(
        {
            "token":token
        }
    );
}

module.exports = {
    signUpUser
}