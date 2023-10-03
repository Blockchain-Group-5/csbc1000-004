const {Router} = require("express");
const {createProduct, showProduct, updateStock, removeProduct} = require("../controller/product");

const router = Router();

// Create Product record
router.post("/create_product", createProduct);

// Retrieve Product record
router.get("/show_product/:product_id", showProduct);

// Filter Product records

// Update Stock
router.put("/update_stock/:product_id", updateStock);

// Remove Product record
router.delete("/remove_product/:product_id", removeProduct);

module.exports = router;