const express = require("express");
const bodyParser = require("body-parser");
const {initApp, getAPI} = require("./config/firebase");

// Initialize Firebase to access its service
initApp();

// Initialize Express
const app = express();
const main = express();

main.use("/api/v1", app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({extended: false}));

const webAPI = getAPI(main);
module.exports = {webAPI};

const productRoutes = require("./routes/products");
app.use("/", productRoutes);
