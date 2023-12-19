const express = require("express");
const { changeBatch } = require("../controllers/batchController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/", validateToken, changeBatch);

module.exports = router;
