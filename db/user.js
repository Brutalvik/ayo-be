import client from "./config";

const users = async() => {
    const connection = await client.connect();
    console.log(connection)
    const userCollection = client.db("ayo").collection("users");
    return userCollection;

}

module.exports = users;