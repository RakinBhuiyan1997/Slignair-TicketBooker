import React from "react";
import styled from "styled-components";
import FlightSelect from "./FlightSelect";
import Plane from "./Plane";
import ClientReservationForm from "./ClientReservationForm";

const SeatSelect = () => {
  return (
    <>
      <FlightSelect />
      <h2>Select your seat and Provide your information!</h2>
      <Container>
        <Plane />
        <ClientReservationForm />
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default SeatSelect;
