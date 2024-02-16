require("dotenv").config();
import { MongoClient, ServerApiVersion } from "mongodb";
const URL = process.env.DB_URL;

//connection
const client = new MongoClient(URL, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

export default client;