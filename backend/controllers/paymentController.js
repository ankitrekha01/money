const asyncHandler = require("express-async-handler");
const Payment = require("../models/Payment");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/User");

//@desc Check payment
//@route GET /payment
//@access private
const paymentCheck = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  let checkPayment = new User(userId, null, null, null, null, null, null, null);
  checkPayment = await checkPayment.checkPayment();
  if (checkPayment) {
    res.status(200);
    res.json({
      message: "Payment already done",
    });
    return;
  }
  const paymentId = uuidv4();
  let currPayment = new Payment(paymentId, userId);
  currPayment = await currPayment.save();
  if (!currPayment) {
    res.status(400);
    throw new Error("Invalid payment data");
  } else {
    let updatePayment = new User(
      userId,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    );
    updatePayment = await updatePayment.updatePaymentDate();
    if (!updatePayment) {
      res.status(400);
      throw new Error("Invalid payment data");
    }
    res.status(201).json({
      message: "Payment done",
      payment: paymentId,
    });
  }
});

module.exports = {
  paymentCheck,
};
