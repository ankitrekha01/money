const asyncHandler = require("express-async-handler");
const User = require("../models/User");


// @desc Get Dashboard
// @route GET /dashboard
// @access Private
const getDashboard = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  let checkPayment = new User(userId, null, null, null, null, null, null, null);
  checkPayment = await checkPayment.checkPayment();
  if (checkPayment) {
    res.status(200);
    res.json({
      message: "Payment already done",
      checkPayment
    });
  }else{
    res.status(200);
    res.json({
        message: "Payment not done",
        checkPayment
      });
  }
});

module.exports = {
  getDashboard,
};
