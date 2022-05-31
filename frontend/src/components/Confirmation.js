import React, { useContext } from "react";
import styled from "styled-components";
import { FlightContext } from "./FlightContext";
import tombstone from "../assets/tombstone.png";

const Confirmation = () => {
  const { confirmRes } = useContext(FlightContext);
  console.log(confirmRes);
  return (
    <div>
      <Container>
        <h1>Flight Confirmed! Get ready to fly {confirmRes.firstName}</h1>
        <Wrapper>
          <Res>First Name: {confirmRes.firstName}</Res>
          <Res>Family Name: {confirmRes.familyName}</Res>
          <Res>Email: {confirmRes.email}</Res>
          <Res>Flight Number: {confirmRes.plane}</Res>
          <Res>Seat Number: {confirmRes.seatRes}</Res>
          <Res>Confirmation Id: {confirmRes._id}</Res>
        </Wrapper>
        <Image src={tombstone} />s
      </Container>
    </div>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  border: 5px solid #aa001e;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Res = styled.h2`
  margin: 10px;
`;
const Image = styled.img`
  height: 140px;
  margin-top: 30px;
  margin-bottom: 20px;
`;
export default Confirmation;
