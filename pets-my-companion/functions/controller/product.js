const {v4: uuidv4} = require("uuid");
const {create, show, update, remove} = require("../model/product")
// const {default: Ajv} = require("ajv");
// 
// const ajv = new Ajv();
// 
// const schema = {
//     type: 'object',
//     properties: {
//         type: {
//             type: 'string'
//         },
//         breed: {
//                 type: 'string'
//         },
//         name: {
//             type: 'string'
//        },
//         image: {
//             type: 'url'
//         },
//         age: {
//             type: 'integer'
//         },
//         description: {
//             type: 'string'
//         },
//         price: {
//             type: 'number', pattern: '^\d+(?:\.\d{1,2}){0,1}$'
//         },
//         location: {
//             type: 'string'
//         },
//         contact_details: {
//             type: 'string', pattern: '^[0-9]{10}$' 
//         }
//     },
//     required:['type', 'breed', 'name', 'image', 'age', 'description', 'price', 'location', 'contact_details']
// }
//  const validate = ajv.compile(schema)

const createProduct = async (req, res) => {
    try {
        // const isValid = validate(req.body);
        // if(!isValid) {
        //     return res.status(400).send(`The field ${validate.errors[0].instancePath.substring(1)} ${validate.errors[0].message}`)
        // }

        let product = req.body;
        product["product_id"] = uuidv4();
        product["in_stock"] = true;
        await create(product);

        res.status(201).json({
            product_id: product.product_id, 
            message: `successfully added product with id ${product.product_id}`
        });
    } catch (error) {
        res.status(400).json({
            error: error,
        });
    }
};

const showProduct = async (req, res) => {
    try {
        let productId = req.params.id;
        let result = await show(productId);

        res.status(200).json(result.data());
    }
    catch (error) {
        res.status(400).json({
            error: error,
        });
    }
}

const updateStock = async (req,res) => {
    try {
        // const isValid = updateValidate(req.body);
        // if(!isValid) {
        //     return res.status(400).send(`The field ${updateValidate.errors[0].instancePath.substring(1)} ${updateValidate.errors[0].message}`)
        // }
        let product_id = req.params.id;
        let Product = req.body;
        await update(product_id, Product);
        const productResult = await show(product_id);
        res.status(201).json(productResult.data());
    } catch (error) {
        res.status(400).json({
            error: error,
        });
    }
}

const removeProduct = async (req,res) => {
     try {
        let product_id = req.params.id;
        const result = await retrieve(id);
        if(result.data() == undefined) {
            throw new Error(`Product with id ${product_id} does not exist`);
        }
        await remove(product_id);
        res.status(201).send(`Successfully deleted Product with id ${product_id}`);
     }
     catch (error) {
        res.status(400).json({
            error: error,
        });
     }
}

module.exports = {createProduct, showProduct, updateStock, removeProduct};