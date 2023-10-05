const {Router} = require("express");
const {createProduct, products, showProduct, updateStock, removeProduct, purchaseProduct, filter_products} = require("../controller/product");

const router = Router();

// Create Product record
router.post("/product/create_product", createProduct);

//Get all products record
router.get("/product/products/", products);

// Retrieve Product record
router.get("/product/show_product/:product_id", showProduct);

// Filter Product records

// Update Stock
router.put("/product/update_stock/:product_id", updateStock);

// Remove Product record
router.delete("/product/remove_product/:product_id", removeProduct);

// Purchase a Product
router.get("/product/purchase/:product_id", purchaseProduct);

//filter products
router.get("/product/filter", filter_products)

module.exports = router;