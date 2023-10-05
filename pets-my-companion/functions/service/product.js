const logger = require("firebase-functions/logger");

const calculateTotal = (rate) => {
    logger.log("Product Service : Before Calculating Total");
    if(typeof rate != "number") {
        throw new Error(`The price ${rate} of the product is NAN`);
    }
    return rate + (rate * 0.13) + 10;   // Platform Commission - $10
}

module.exports = {calculateTotal};