import React, { createContext, useState } from "react";

export const FlightContext = createContext(null);

export const FlightProvider = ({ children }) => {
  const [resDetails, setResDetails] = useState({
    _id: null,
    plane: null,
    seatRes: null,
    firstName: "",
    familyName: "",
    email: "",
  });
  const [confirmRes, setConfirmRes] = useState(null);
  const [getClientRes, setClientRes] = useState(null);
  return (
    <FlightContext.Provider
      value={{
        resDetails,
        setResDetails,
        confirmRes,
        setConfirmRes,
        getClientRes,
        setClientRes,
      }}
    >
      {children}
    </FlightContext.Provider>
  );
};
