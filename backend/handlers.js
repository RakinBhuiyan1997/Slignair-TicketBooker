"use strict";

const { v4: uuidv4 } = require("uuid");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getFlights = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("Slingair");
    const result = await db.collection("Flight_Numbers").find().toArray();
    res.status(200).json({
      message: "You good",
      data: result,
    });
  } catch (err) {
    console.log("Uh Oh", err);
  }
  client.close();
};

const getFlight = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    const flightId = req.params.flight;

    await client.connect();
    const db = client.db("Slingair");
    const result = await db.collection(`${flightId}`).find().toArray();
    return res.status(200).json({
      status: 200,
      message: "ok",
      data: result,
    });
  } catch (err) {
    console.log("Error", err);
  }
  client.close();
};

const addReservation = async (req, res) => {
  const client = await new MongoClient(MONGO_URI, options);
  try {
    const reservation = {
      _id: uuidv4(),
      plane: req.body.plane,
      seatRes: req.body.seatRes,
      firstName: req.body.firstName,
      familyName: req.body.familyName,
      email: req.body.email,
    };
    const seatId = req.body.seatRes;

    await client.connect();
    const db = client.db("Slingair");
    await db.collection("Reservations").insertOne(reservation);
    await db.collection(`${reservation.plane}`).updateOne(
      { id: seatId },
      {
        $set: {
          isAvailable: false,
        },
      },
      {}
    );
    return res.status(200).json({
      status: 200,
      message: "Reservation Posted!",
      data: reservation,
    });
  } catch (err) {
    console.log("WHAT YOU DOIN BOI", err);
  }
  client.close;
};

const getReservations = async (req, res) => {
  const client = await new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("Slingair");
    const reservations = await db.collection("Reservations").find().toArray();
    res.status(200).json({
      status: 200,
      message: "ok",
      data: reservations,
    });
  } catch (err) {
    console.log("WHAT YOU DOIN BOI", err);
  }
  client.close;
};

const getSingleReservation = async (req, res) => {
  const client = await new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("Slingair");
    const reservationId = req.params.id;

    const result = await db
      .collection("Reservations")
      .findOne({ _id: reservationId });
    res.status(200).json({
      status: 200,
      message: "Your boi is tired",
      data: result,
    });
  } catch (err) {
    console.log("Something went wrong!", err);
  }
  client.close();
};

const deleteReservation = async (req, res) => {
  const client = await new MongoClient(MONGO_URI, options);
  try {
    const resId = req.params.id;
    await client.connect();
    const db = client.db("Slingair");
    const info = await db.collection("Reservations").findOne({ _id: resId });
    console.log(info);
    await db.collection(`${info.plane}`).updateOne(
      { id: info.seatRes },
      {
        $set: {
          isAvailable: true,
        },
      },
      {}
    );
    await db.collection("Reservations").deleteOne({ _id: resId });
    res.status(200).json({
      status: 200,
      message: "Reservation successfully deleted!",
    });
  } catch (err) {
    console.log("Error", err);
  }
  client.close();
};

const updateReservation = async (req, res) => {
  const client = await new MongoClient(MONGO_URI, options);
  const resChange = {
    plane: req.body.plane,
    firstName: req.body.firstName,
    familyName: req.body.familyName,
    email: req.body.email,
  };

  if (
    resChange.plane &&
    resChange.firstName &&
    resChange.familyName &&
    resChange.email
  ) {
    try {
      const reqId = req.params.id;
      await client.connect();
      const db = client.db("Slingair");
      await db.collection("Reservations").updateOne(
        { _id: reqId },
        {
          $set: {
            plane: resChange.plane,
            firstName: resChange.firstName,
            familyName: resChange.familyName,
            email: resChange.email,
          },
        }
      );
      res.status(200).json({
        status: 200,
        message: "Reservation Updated!",
      });
    } catch (err) {}
    console.log("Error", err);
  } else {
    res.status(400).json({
      status: 400,
      message: "Missing info! Must include all reservation changes!",
      data: resChange,
    });
  }
};

module.exports = {
  getFlights,
  getFlight,
  getReservations,
  addReservation,
  getSingleReservation,
  deleteReservation,
  updateReservation,
};
