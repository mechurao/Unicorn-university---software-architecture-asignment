const express = require('express');
const authController = require('./auth-controller');
const toiletController = require('./toilet-controller');
const router = express.Router();

router.use("/auth", authController);
router.use("/toilet",toiletController);

module.exports = router;
