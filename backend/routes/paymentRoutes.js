const express = require("express");
const { paymentCheck } = require("../controllers/paymentController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.get("/", validateToken, paymentCheck);

module.exports = router;
