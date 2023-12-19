const db = require("../config/dbConnection");
class Payment{
    constructor(paymentId,userId){
        this.paymentId = paymentId;
        this.userId = userId;
    }

    save = async () => {
        try{
            const paymentDate = new Date();
            const paymentComplete = true;
            const [rows, _] = await db.execute(
                "INSERT INTO payment (PaymentId,UserId,PaymentDate,PaymentComplete) VALUES (?,?,?,?)",
                [this.paymentId,this.userId,paymentDate,paymentComplete]
            );
            // console.log(rows);
            return rows;
        }catch(err){
            console.log(err);
        }
    }

    // checkPayment = async () => {
    //     try{
    //         const [rows, _] = await db.execute(
    //             `SELECT * FROM payment
    //             WHERE UserId = ?
    //               AND PaymentComplete = true
    //             ORDER BY PaymentDate DESC
    //             LIMIT 1`,
    //             [this.userId]
    //         );
    //         // console.log(rows[0]);
    //         return rows[0];
    //     }catch(err){
    //         console.log(err);
    //     }
    // }
}

module.exports = Payment;