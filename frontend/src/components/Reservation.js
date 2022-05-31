import React, { useState, useContext } from "react";

import { FlightContext } from "./FlightContext";

import styled from "styled-components";
const Reservation = () => {
  const { getClientRes, setClientRes } = useContext(FlightContext);
  const [resId, setResId] = useState("");
  const [loaded, setLoaded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch(`/reservation/${resId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClientRes(data.data);
        setLoaded(true);
      });
  };
  return (
    <div>
      {!loaded ? (
        <div>
          <Title>Find your Reservation Details</Title>
          <Form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Reservation Id!"
              onChange={(e) => {
                setResId(e.target.value);
              }}
            ></input>
            <button type="submit">Find your details</button>
          </Form>
        </div>
      ) : (
        <div>
          <Container>
            <Wrapper>
              <Res>Confirmation Id: {getClientRes._id}</Res>
              <Res>Flight Number: {getClientRes.plane}</Res>
              <Res>Seat Number: {getClientRes.seatRes}</Res>
              <Res>First Name: {getClientRes.firstName}</Res>
              <Res>Family Name: {getClientRes.familyName}</Res>
              <Res>Email: {getClientRes.email}</Res>
            </Wrapper>
          </Container>
        </div>
      )}
    </div>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 5px solid #aa001e;
  margin-top: 50px;
`;
const Form = styled.form`
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Res = styled.p`
  margin: 15px;
`;

const Title = styled.h1`
  color: #aa001e;
  font-size: 40px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

export default Reservation;
