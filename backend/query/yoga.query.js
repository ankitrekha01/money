const QUERY = {
  SAVE_USER: `INSERT INTO user (userId,batchId,name,age,phoneNumber,enrollMonth,password,createdOn) VALUES (?,?,?,?,?,?,?,?)`,
  CHECK_USER: `SELECT * FROM user WHERE phoneNumber = ?`,
  GET_USER: `SELECT * FROM user WHERE userId = ?`,
  UPDATE_PAYMENT_DATE: `UPDATE user SET latestPayment = ? WHERE userId = ?`,
  UPDATE_USER_BATCH: `UPDATE user SET batchId = ? and enrollMonth=? WHERE userId = ?`,
  PAYMENT_SAVE: `INSERT INTO payment (paymentId,userId,paymentDate,paymentComplete) VALUES (?,?,?,?)`,
  FIND_BATCH: `SELECT batchId FROM batch WHERE batch = ?`,
};

module.exports = QUERY;