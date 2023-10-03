const {getDB} = require("../config/firebase");

const db = getDB();
const productCollection = "products";

// Create
const create = async(product) => {
    await db
    .collection(productCollection)
    .doc(product.product_id)
    .set(Object.assign({}, product));
}

// Retrieve
const show = async(product_id) => {
    await db.collection(productCollection).doc(product_id).get();
}

// Update
const update = async(product_id, product) => {
    await db.collection(productCollection).doc(product_id).set(product, {merge:true});
}

// Remove
const remove = async (product_id) => {
    await db.collection(productCollection).doc(product_id).delete();
}
module.exports = {create, show, update, remove};