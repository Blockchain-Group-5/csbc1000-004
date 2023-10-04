const Ajv = require("ajv");
const ajv = new Ajv();

const logger = require("firebase-functions/logger");

class Product {
    constructor(product_id, name, type, breed, age, description, price, location, contact_details, in_stock, image = {}) {
        this.product_id = product_id;
        this.name = name;
        this.type = type;
        this.breed = breed;
        this.age = age;
        this.description = description;
        this.price = price;
        this.location = location;
        this.contact_details = contact_details;
        this.in_stock = in_stock;
        this.image = image;
    }
}

const productSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string'
        },
        type: {
            type: 'string'
        },
        breed: {
                type: 'string'
        },
        age: {
            type: 'number'
        },
        description: {
            type: 'string'
        },
        price: {
            type: 'number'
        },
        location: {
            type: 'string'
        },
        contact_details: {
            type: 'string', pattern: '^[0-9]{10}$' 
        }
    },
    required: ['type', 'breed', 'name', 'image', 'age', 'description', 'price', 'location', 'contact_details']
}

const productSchemaUpdate = {
    type: 'object',
    properties: {
        name: {
            type: 'string'
        },
        type: {
            type: 'string'
        },
        breed: {
                type: 'string'
        },
        age: {
            type: 'number'
        },
        description: {
            type: 'string'
        },
        price: {
            type: 'number'
        },
        location: {
            type: 'string'
        },
        contact_details: {
            type: 'string', pattern: '^[0-9]{10}$' 
        }
    }
}

const createProductValidator = (req) => {
    logger.log("Create Product : Before Constructor");
    const product =  new Product(
        req.product_id, 
        req.name, 
        req.type, 
        req.breed, 
        req.age, 
        req.description, 
        req.price, 
        req.location, 
        req.contact_details, 
        req.in_stock, 
        req.image
        );
    logger.log("Create Product : After Constructor");
    logger.log(product);
    validate(product, 'create');
    logger.log("Create Product : After Validation");
    return product;
}

const validate = (product, crud) => {
    logger.log("Validate Product : Before Validation");
    const validator = (crud === 'create')? ajv.compile(productSchema):ajv.compile(productSchemaUpdate);
    const isValid = validator(product);
    logger.log(`isValid: ${isValid}`);
    if(!isValid) {
        throw new Error(`The field ${validator.errors[0].keyword} ${validator.errors[0].message}`);
    }
    logger.log("Validate Product : After Validation");
}

module.exports = {createProductValidator, validate};