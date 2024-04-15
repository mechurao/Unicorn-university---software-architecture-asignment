const  express = require("express");
const {signUpUser} = require("../../ABL/Auth/signUpABL");
const {signInUserEmail} = require("../../ABL/Auth/signInABL");
const router = express.Router();

router.post("/sign-in", async (req, res) => {
   await signInUserEmail(req,res);
});

router.post("/sign-up", async (req, res) => {
   await signUpUser(req,res);
});

module.exports = router;

