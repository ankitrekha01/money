const express = require("express");
const { getDashboard } = require("../controllers/dashboardController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.get("/", validateToken, getDashboard);

module.exports = router;
