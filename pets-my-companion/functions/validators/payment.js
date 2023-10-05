const Ajv = require("ajv");
const ajv = new Ajv();

const logger = require("firebase-functions/logger");

class Payment {
    constructor(payment_id, product_id, total_amount, is_paid) {
        this.payment_id = payment_id;
        this.product_id = product_id;
        this.total_amount = total_amount;
        this.is_paid = is_paid;
    }
}

const paymentSchema = {
    type: 'object',
    properties: {
        product_id: {
            type: 'string'
        },
        total_amount: {
            type: 'number'
        },
        is_paid: {
                type: 'boolean'
        }
    },
    required: ['product_id', 'total_amount', 'is_paid']
}

const createPaymentValidator = (req) => {
    logger.log("Create Payment : Before Constructor");
    const payment =  new Payment(
        req.payment_id, 
        req.product_id, 
        req.total_amount, 
        req.is_paid
        );
    logger.log("Create Payment : After Constructor");
    logger.log(payment);
    validate(payment);
    logger.log("Create Payment : After Validation");
    return payment;
}

const validate = (payment) => {
    logger.log("Validate Payment : Before Validation");
    const validator = ajv.compile(paymentSchema);
    const isValid = validator(payment);
    logger.log(`isValid: ${isValid}`);
    if(!isValid) {
        throw new Error(`The field ${validator.errors[0].keyword} ${validator.errors[0].message}`);
    }
    logger.log("Validate Payment : After Validation");
}

module.exports = {createPaymentValidator, validate};