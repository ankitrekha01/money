const db = require("../config/dbConnection");

const Batch = require("./Batch");

class User {
  constructor(
    userId,
    name,
    age,
    phone,
    batch,
    enrollMonth,
    hashedPassword
  ) {
    this.userId = userId;
    this.name = name;
    this.age = age;
    this.phone = phone;
    this.enrollMonth = enrollMonth;
    this.hashedPassword = hashedPassword;
    this.batch = batch;
  }

  // SAVE USER
  save = async () => {
    try {
      let d = new Date();
      let yyyy = d.getFullYear();
      let mm = d.getMonth() + 1;
      let dd = d.getDate();
      let createOn = yyyy + "-" + mm + "-" + dd;
      let batchId = new Batch(this.batch);
      batchId = await batchId.findBatch();
      batchId = batchId[0].BatchId;
      // console.log(this.userId, this.name, this.age, this.phone, this.enrollMonth, this.hashedPassword, createOn);
      const [rows, _] = await db.execute(
        "INSERT INTO user (UserId,BatchId,Name,Age,PhoneNumber,EnrollMonth,password,CreatedOn) VALUES (?,?,?,?,?,?,?,?)",
        [
          this.userId,
          batchId,
          this.name,
          this.age,
          this.phone,
          this.enrollMonth,
          this.hashedPassword,
          createOn,
        ]
      );
      return rows;
    } catch (err) {
      console.log(err);
    }
  };

  // CHECK IF USER EXISTS
  checkUser = async () => {
    try {
      const [rows, _] = await db.execute(
        "SELECT * FROM user WHERE PhoneNumber = ?",
        [this.phone]
      );
      // console.log(rows);
      return rows;
    } catch (err) {
      console.log(err);
    }
  };

  // Check payment status
  checkPayment = async () => {
    try {
      const [rows, _] = await db.execute(
        `SELECT * FROM user
        WHERE UserId = ?`,
        [this.userId]
      );
      const currentMonth = new Date().getMonth();
      if (
        rows[0].LatestPayment &&
        rows[0].LatestPayment.getMonth() == currentMonth
      ) {
        console.log(rows[0]);
        return rows[0];
      } else {
        return null;
      }
      // console.log(rows[0]);
      // return rows[0];
    } catch (err) {
      console.log(err);
    }
  };

  // Update User Payment Date
  updatePaymentDate = async () => {
    try {
      const [rows, _] = await db.execute(
        `UPDATE user SET LatestPayment = ? WHERE UserId = ?`,
        [new Date(), this.userId]
      );
      // console.log(rows);
      return rows;
    } catch (err) {
      console.log(err);
    }
  };

  // Update User Batch
  updateUserBatch = async () => {
    try {
      let batchId = new Batch(this.startTime, this.endTime);
      batchId = await batchId.findBatch();
      batchId = batchId[0].BatchId;
      const [rows, _] = await db.execute(
        `UPDATE user SET BatchId = ? and EnrollMonth=? WHERE UserId = ?`,
        [batchId,this.enrollMonth, this.userId]
      );
      // console.log(rows);
      return rows;
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = User;
