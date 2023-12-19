const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// @desc change batch for the user
// @route POST /batch
// @access Private
const changeBatch = asyncHandler(async (req, res) => {
  const { startTime, endTime } = req.body;
  const userId = req.user.id;
  if(new Date().getDate() !== 1){
    res.status(400);
    throw new Error("Batch Cannot be changed");
  }
  const enrollMonth = new Date().getMonth();
  let user = new User(
    userId,
    null,
    null,
    null,
    startTime,
    endTime,
    enrollMonth,
    null
  );
  user = await user.updateUserBatch();
  if (user) {
    res.status(200).json({
      message: "Batch Changed Successfully",
    });
  } else {
    res.status(400);
    throw new Error("Batch Change Failed");
  }
});

module.exports = {
  changeBatch,
};
