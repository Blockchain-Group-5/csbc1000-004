const {geetDB} = require("../config/firebase")

const db = getDB()
const productCollection = "products"
 
const create = async(product) => {
    await db
    .collection(productCollection)
    .doc(mockProduct.product_id)
    .set(Object.assign({}, product));
}

const show = async(product_id) => {
    await db.collection(productCollection).doc(req.params.product_id).get()
}

const update = async(product_id,product) => {
    await db.collection(productCollection).doc(product_id).set(product, {merge:true})
}

module.exports = {create, show, update}