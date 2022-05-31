import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import "../SeatSelect/FlightSelect.css";
import { FlightContext } from "../FlightContext";

const FlightSelect = () => {
  const { resDetails, setResDetails } = useContext(FlightContext);
  const [planes, setPlanes] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/getflights")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPlanes(data.data);
        setLoaded(true);
      });
  }, []);
  return (
    <>
      {loaded && (
        <div className="container">
          <h1>Choose Your Flight</h1>
          <SelectFlight
            defaultValue={"default"}
            name="Choose your Flight"
            onChange={(e) => {
              setResDetails({ ...resDetails, plane: e.target.value });
            }}
          >
            <option value="default" disabled>
              Select a flight
            </option>
            {planes.map((val) => {
              return <option key={val._id}>{val.flight}</option>;
            })}
          </SelectFlight>
        </div>
      )}
    </>
  );
};

const SelectFlight = styled.select`
  height: 40px;
  width: 125px;
`;

export default FlightSelect;
