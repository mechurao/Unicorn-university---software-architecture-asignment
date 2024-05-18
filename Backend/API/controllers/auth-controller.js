const  express = require("express");
const {signUpUser} = require("../../ABL/Auth/signUpABL");
const {signInUserEmail} = require("../../ABL/Auth/signInABL");
const {logoutUser} = require("../../ABL/Auth/logoutABL");
const {checkToken} = require("../../ABL/Auth/checkTokenABL");
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

router.post("/check-token", async (req, res) => {
   await checkToken(req,res);
});

module.exports = router;

