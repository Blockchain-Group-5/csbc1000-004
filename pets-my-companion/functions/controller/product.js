const {v4: uuidv4} = require("uuid");
const {create, show, update, remove} = require("../model/product");
const {createProductValidator, validate} = require("../validators/product");

const createProduct = async (req, res) => {
    try {
        let product = req.body;
        product["product_id"] = uuidv4();
        product["in_stock"] = true;
        const validatedProduct = createProductValidator(product);
        await create(validatedProduct);

        res.status(201).json({
            product_id: product.product_id, 
            message: `successfully added product with id ${product.product_id}`
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const showProduct = async (req, res) => {
    try {
        const productId = req.params.product_id;
        // console.log(req.params)
        const product = await show(productId);
        if(product == undefined) {
            throw new Error(`Product with id ${productId} does not exist`);
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(400).send(error.message)
    }
}

const updateStock = async (req,res) => {
    try {
        let productId = req.params.product_id;
        let Product = req.body;

        // To check if Product with product_id exist
        const result = await show(productId);
        if(result == undefined) {
            throw new Error(`Product with id ${productId} does not exist`);
        }

        // Validation | If fails, will throw error
        validate(Product, 'update');

        // Update
        await update(productId, Product);

        // To get updated Product
        const productResult = await show(productId);
        res.status(201).json(productResult);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const removeProduct = async (req,res) => {
     try {
        let productId = req.params.product_id;
        const result = await show(productId);
        if(result == undefined) {
            throw new Error(`Product with id ${productId} does not exist`);
        }
        await remove(productId);
        res.status(201).send(`Successfully deleted Product with id ${productId}`);
     }
     catch (error) {
        res.status(400).send(error.message);
     }
}

module.exports = {createProduct, showProduct, updateStock, removeProduct};