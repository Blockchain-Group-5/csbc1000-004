const {Router} = require("express");
const {createProduct, showProduct, updateStock, removeProduct} = require("../controller/product");

const router = Router();

// Create Product record
router.post("/product/create_product", createProduct);

// Retrieve Product record
router.get("/product/show_product/:id", showProduct);

// Filter Product records

// Update Stock
router.put("/product/update_stock/:product_id", updateStock);

// Remove Product record
router.delete("/product/remove_product/:product_id", removeProduct);

module.exports = router;