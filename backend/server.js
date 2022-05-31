"use strict";

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const {
  getFlights,
  getFlight,
  getReservations,
  addReservation,
  getSingleReservation,
  deleteReservation,
  updateReservation,
} = require("./handlers");
express()
  // Below are methods that are included in express()
  // --------------------------------------------------------------------------------

  .use(morgan("tiny"))
  .use(express.json())
  .use(bodyParser.json())
  .use(express.static("public"))

  // ---------------------------------

  //Endpoints
  .get("/getflights", getFlights)
  .get("/getflights/:flight", getFlight)
  .get("/reservations", getReservations)
  .get("/reservation/:id", getSingleReservation)
  .post("/add-reservation", addReservation)
  .delete("/delete-reservation/:id", deleteReservation)
  .patch("/update-reservation/:id", updateReservation)

  // ---------------------------------
  //Catch all endpoint
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(8000, () => console.log(`Listening on port 8000`));
