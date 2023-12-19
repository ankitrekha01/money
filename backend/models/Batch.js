const db = require("../config/dbConnection");
class Batch {
  constructor(batch) {
    this.batch = batch;
  }
  findBatch = async () => {
    try {
      const [rows, _] = await db.execute(
        "SELECT BatchId FROM batch WHERE batch = ?",
        [this.batch]
      );
      return rows;
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = Batch;
