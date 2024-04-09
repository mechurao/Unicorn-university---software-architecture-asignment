let users = {
    1:{
        name:"John"
    },
    2:{
        name:"Peter"
    }
}


function getUser(id,res){
    let user = users[id];
    if(user){
        res.json(user)
    }else{
        res.status(400).json({
            error:"User does not exist"
        })
    }
}

module.exports = {
    getUser
}