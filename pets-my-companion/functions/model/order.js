const {getDB} = require("../config/firebase");
const logger = require("firebase-functions/logger");

const db = getDB();
const orderCollection = "orders";

// Create Order
const createOrder = async(order) => {
    logger.log("Order Model : Before Create");
    await db
    .collection(orderCollection)
    .doc(order.order_id)
    .set(Object.assign({}, order));
}

module.exports = {createOrder};