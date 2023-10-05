const {v4: uuidv4} = require("uuid");
const {createOrder} = require("../model/order");
const {createOrderValidator} = require("../validators/order");
const logger = require("firebase-functions/logger");

const createOrderFn = (product_id, payment_id) => {
    try {
        logger.log("Order Service : Before Create Order");
        const order = {};
        order.order_id = uuidv4();
        order.product_id = product_id;
        order.payment_id = payment_id;
        order.order_status = "order placed";

        const validatedOrder = createOrderValidator(order);
        createOrder(validatedOrder);
        logger.log(`successfully Order with id ${validatedOrder.order_id} is created`);
        logger.log("Order Service : Leaving Create Order");

        return order.order_id;
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {createOrderFn};