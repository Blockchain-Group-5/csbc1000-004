const {v4: uuidv4} = require("uuid");
const {createPayment} = require("../model/payment");
const {createPaymentValidator} = require("../validators/payment");
const logger = require("firebase-functions/logger");

const createPaymentFn = (product_id, total) => {
    try {
        logger.log("Payment Service : Before Create Payment");
        const payment = {};
        payment.payment_id = uuidv4();
        payment.product_id = product_id;
        payment.total_amount = total;
        payment.is_paid = true;

        const validatedPayment = createPaymentValidator(payment);
        createPayment(validatedPayment);
        logger.log(`successfully Payment with id ${validatedPayment.payment_id} is created`);
        logger.log("Payment Service : Leaving Create Payment");

        return payment.payment_id;
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {createPaymentFn};