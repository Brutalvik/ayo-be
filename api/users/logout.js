const express = require("express");
const logout = express.Router();
const users = require("../../db/users");
const { ObjectId } = require("mongodb");

logout.post("/logout", async (req, res) => {
  const id = new ObjectId(req.query.id);

  const usersCollection = await users();
  const response = await usersCollection.findOne({ _id: id });

  if (!response) {
    return res.status(400).send({
      isLoggedIn: true,
      message: `Could not logout user`,
    });
  }

  const updateResponse = await usersCollection.updateOne(
    { _id: id },
    { $set: { isLoggedIn: false } }
  );

  if (!updateResponse.acknowledged) {
    return res.status(400).send({
      isLoggedIn: true,
      message: "Something went wrong",
    });
  }

  res.status(200).send({
    isLoggedIn: false,
    message: "User logged out successfully",
    data: null,
  });
});

module.exports = logout;