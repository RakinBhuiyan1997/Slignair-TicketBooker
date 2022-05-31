const { flights, reservations } = require("./data");
const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const dbFunction = async () => {
  // creates a new client
  const client = await new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Slingair");
    await db.collection("Flight_Numbers").insertOne({
      _id: "SA231",
      flight: "SA231",
    });
  } catch (err) {
    console.log("Error", err);
  }
  client.close();
};

dbFunction();
