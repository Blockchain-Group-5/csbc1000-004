const {v4: uuidv4} = require("uuid");
const {create, showAll, show, update, remove} = require("../model/product");
const {createProductValidator, validate} = require("../validators/product");
const {calculateTotal} = require("../service/product");
const {createPaymentFn} = require("../service/payment");
const {createOrderFn} = require("../service/order");

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

const products = async (req, res) => {
    try {
        const result = await showAll();
        const all_products = [];

        result.forEach(doc => {
            all_products.push({
              id: doc.id,
              data: doc.data()
            })
          });

        res.status(200).json(all_products);
    }
    catch (error) {
        res.status(400).json({
            error: error,
        });
    }
}

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

const filter_products = async (req,res) => {
    try {
        const filters = req.query; 
        const result = await showAll();
        const products = [];

        result.forEach(doc => {
            products.push(doc.data())
        });

        const filteredProducts = products.filter(product => { 
            let isProductValid = true; 
            for (key in filters) { 
              isProductValid = isProductValid && product[key] == filters[key]; 
            } 
            return isProductValid; 
        });
        res.status(201).json(filteredProducts);
    } catch (error) {
        res.status(400).json({
            error: error,
        });
    }
}

const purchaseProduct = async (req, res) => {
    try {
        const productId = req.params.product_id;
        const result = await show(productId);
        if (result == undefined) {
            throw new Error(`Product with id ${productId} does not exist`);
        }

        if (result.in_stock == false) {
            throw new Error(`Product with id ${productId} is not in stock`);
        }

        // Order Placing
        const total = calculateTotal(result.price);
        const payment_id = createPaymentFn(productId, total);
        const order_id = createOrderFn(productId, payment_id);

        // To change the product stock status
        result.in_stock = false;
        await update(productId, result);

        res.status(201).send(`Successfully Order Placed with Order id ${order_id}`);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {createProduct, products, showProduct, updateStock, removeProduct, purchaseProduct, filter_products};