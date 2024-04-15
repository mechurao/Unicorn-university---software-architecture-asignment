const {isEmailRegistred} = require("../../Helpers/emailHelper");
const {performDbQuery} = require("../../Helpers/dbHelper");
const {GET_UID_BY_EMAIL_QUERY} = require("../../Values/dbQueries");
const {getUserPassword} = require("../../Helpers/passwordHelper");
const {hashMatches} = require("../../Helpers/hashHelper");
const {getUserTokens, deleteUserToken, saveUserToken} = require("../../Helpers/tokenHelper");
const {generateToken} = require("../../Utils/tokenGenerator");
const {getUserData} = require("../../Helpers/userAccountHelper");

async function signInUserEmail(req, res){
    const {email, password} = req.body;


    // check email
    if(!email || !password){
        return  res.sendStatus(400);
    }

    try{
        // check email
        let mail = await  isEmailRegistred(email);
        if(!mail){
            res.sendStatus(EMAIL_DOES_NOT_EXIST_CODE);
        }

        // get uID
        let uIDQuery = await performDbQuery(GET_UID_BY_EMAIL_QUERY,[email]);
        if(!uIDQuery || uIDQuery.length === 0){
            return res.sendStatus(USER_NOT_FOUND_CODE);
        }
        let uID = uIDQuery[0].uID;

        // check password
        let passwdQuery = await  getUserPassword(uID);
        if(!passwdQuery || passwdQuery.length === 0){
            console.log("Password not found");
            return res.sendStatus(SERVER_ERROR_CODE);
        }

        let hashed = passwdQuery[0].password;
        if(!hashMatches(hashed,password)){
            console.log("Password does not match");
            res.sendStatus(INVALID_USER_CREDENTIALS_CODE)
        }

        let tokenQuery = getUserTokens(uID);

        if(!tokenQuery){
            return res.sendStatus(SERVER_ERROR_CODE);
        }

        if( passwdQuery.length > 0){
            await  deleteUserToken(uID);
        }

        let token = generateToken();

        let saveToken = await  saveUserToken(uID,token);
        if(!saveToken){
            return res.sendStatus(SERVER_ERROR_CODE);
        }

        let userData = await getUserData(uID);
        if(!userData || userData.length === 0){
            return res.sendStatus(SERVER_ERROR_CODE);
        }

        return  res.sendStatus(200).json({
            "token":token,
            "userData":userData
        })
    }catch(error){
        console.log(error);
        return res.sendStatus(SERVER_ERROR_CODE);
    }
}

module.exports = {signInUserEmail}