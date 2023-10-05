const {getDB} = require("../config/firebase");
const logger = require("firebase-functions/logger");

const db = getDB();
const paymentCollection = "payments";

// Create Payment
const createPayment = async(payment) => {
    logger.log("Payment Model : Before Create");
    await db
    .collection(paymentCollection)
    .doc(payment.payment_id)
    .set(Object.assign({}, payment));
}

module.exports = {createPayment};