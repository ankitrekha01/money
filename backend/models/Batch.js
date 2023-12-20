const db = require("../config/dbConnection");
const query = require("../query/yoga.query");
class Batch {
  constructor(batch) {
    this.batch = batch;
  }
  findBatch = async () => {
    try {
      const [rows, _] = await db.execute(
        query.FIND_BATCH,
        [this.batch]
      );
      return rows;
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = Batch;
