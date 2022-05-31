import React, { useContext } from "react";
import { FlightContext } from "../FlightContext";
import styled from "styled-components";

import { useHistory } from "react-router-dom";
const ClientReservationForm = () => {
  const { resDetails, setResDetails, setConfirmRes } =
    useContext(FlightContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await fetch("/add-reservation", {
      method: "POST",
      body: JSON.stringify(resDetails),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const res = await result.json();
    console.log(res);
    setConfirmRes(res.data);
    history.push("/confirmed");
  };
  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            name="f_name"
            onChange={(e) => {
              setResDetails({ ...resDetails, firstName: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Family Name"
            name="l_name"
            onChange={(e) => {
              setResDetails({ ...resDetails, familyName: e.target.value });
            }}
          />
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            onChange={(e) => {
              setResDetails({ ...resDetails, email: e.target.value });
            }}
          />
          <Button type="onSubmit">Confirm!</Button>
        </Form>
      </Container>
    </>
  );
};

const Container = styled.div`
  flex-direction: row;
`;
const Button = styled.button`
  :hover {
    background-color: #d80026;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default ClientReservationForm;
