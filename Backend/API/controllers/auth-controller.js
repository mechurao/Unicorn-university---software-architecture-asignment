const  express = require("express");
const {signUpUser} = require("../../ABL/Auth/signUpABL");
const {signInUserEmail} = require("../../ABL/Auth/signInABL");
const {logoutUser} = require("../../ABL/Auth/logoutABL");
const router = express.Router();

router.post("/sign-in", async (req, res) => {
   await signInUserEmail(req,res);
});

router.post("/sign-up", async (req, res) => {
   await signUpUser(req,res);
});

router.post("/logout", async(req, res) => {
   await  logoutUser(req,res);
});

module.exports = router;

