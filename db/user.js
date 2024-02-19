const client = require("./config")

const users = async() => {
    const connection = await client.connect();
    const userCollection = client.db("Ayo").collection("users");
    return userCollection;

}

module.exports = users;