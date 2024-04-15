const  express = require("express");
const {signUpUser} = require("../../ABL/Auth/signUpABL");
const router = express.Router();

router.post("/sign-in", async (req, res) => {
   res.send("Sign in");
});

router.post("/sign-up", async (req, res) => {
   await signUpUser(req,res);
});

module.exports = router;

