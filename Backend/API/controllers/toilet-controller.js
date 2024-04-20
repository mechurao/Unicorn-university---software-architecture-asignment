const  express = require('express');
const {addToilet} = require("../../ABL/Toilet/addToiletABL");
const {addToiletRating} = require("../../ABL/Toilet/addToiletRatingABL");
const {getToilets} = require("../../ABL/Toilet/getToiletsABL");
const {getToiletDetail} = require("../../ABL/Toilet/getToiletDetailABL");
const router = express.Router();

router.post("/add-toilet", async(req, res) => {
    await  addToilet(req,res);
})

router.get("/get-toilets", async(req, res) => {
    await getToilets(req,res);
})

router.get("/get-detail", async (req, res) => {
    await  getToiletDetail(req,res);
});

router.post("/rate-toilet", async (req, res) => {
    await  addToiletRating(req,res);
})

module.exports = router;