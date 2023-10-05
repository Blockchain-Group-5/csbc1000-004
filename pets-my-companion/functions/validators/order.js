const Ajv = require("ajv");
const ajv = new Ajv();

const logger = require("firebase-functions/logger");

class Order {
    constructor(order_id, product_id, payment_id, order_status) {
        this.order_id = order_id;
        this.product_id = product_id;
        this.payment_id = payment_id;
        this.order_status = order_status;
    }
}

const orderSchema = {
    type: 'object',
    properties: {
        product_id: {
            type: 'string'
        },
        payment_id: {
            type: 'string'
        },
        order_status: {
                type: 'string'
        }
    },
    required: ['product_id', 'payment_id', 'order_status']
}

const createOrderValidator = (req) => {
    logger.log("Create Order : Before Constructor");
    const order =  new Order(
        req.order_id, 
        req.product_id, 
        req.payment_id, 
        req.order_status
        );
    logger.log("Create Order : After Constructor");
    logger.log(order);
    validate(order);
    logger.log("Create Order : After Validation");
    return order;
}

const validate = (order) => {
    logger.log("Validate Order : Before Validation");
    const validator = ajv.compile(orderSchema);
    const isValid = validator(order);
    logger.log(`isValid: ${isValid}`);
    if(!isValid) {
        throw new Error(`The field ${validator.errors[0].keyword} ${validator.errors[0].message}`);
    }
    logger.log("Validate Order : After Validation");
}

module.exports = {createOrderValidator, validate};