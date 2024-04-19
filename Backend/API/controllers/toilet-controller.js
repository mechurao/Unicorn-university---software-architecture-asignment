const  express = require('express');
const {addToilet} = require("../../ABL/Toilet/addToiletABL");
const {addToiletRating} = require("../../ABL/Toilet/addToiletRatingABL");
const router = express.Router();

router.post("/add-toilet", async(req, res) => {
    await  addToilet(req,res);
})

router.get("/get-toilets", async(req, res) => {

})

router.post("/rate-toilet", async (req, res) => {
    await  addToiletRating(req,res);
})

module.exports = router;