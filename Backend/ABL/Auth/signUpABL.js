async function signUpUser(req, res) {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).send({error: 'email or password missing'});
    }



    res.sendStatus(300);
}

module.exports = {
    signUpUser
}