import React, { useReducer } from "react";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import uuid from "uuid";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILtER_CONTACTS,
  CLEAR_FILTER
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Mario",
        email: "mario@mario.com",
        phone: "1234567890",
        type: "professional"
      },
      {
        id: 2,
        name: "Mariarosa",
        email: "mario@mario.com",
        phone: "1234567890",
        type: "personal"
      },
      {
        id: 3,
        name: "Maria",
        email: "mario@mario.com",
        phone: "1234567890",
        type: "personal"
      },
      {
        id: 4,
        name: "Marianna",
        email: "mario@mario.com",
        phone: "1234567890",
        type: "professional"
      }
    ]
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  return (
    <ContactContext.Provider value={{ ...state }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
