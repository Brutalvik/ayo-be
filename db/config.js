require("dotenv").config();
const  { MongoClient, ServerApiVersion } = require("mongodb");
const URL = process.env.DB_URL;

//connection
const client = new MongoClient(URL, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

module.exports = client