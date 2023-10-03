const functions = require("firebase-functions");
const admin = require("firebase-admin");

// initialize firebase to access its services
const initApp = () => {
    admin.initializeApp(functions.config().firestore);
}

const getDB = () => {
    return admin.firestore();
}

const getAPI = () => {
    return functions.https.onRequest(main);

}
module.export = { initApp, getDB, getAPI }