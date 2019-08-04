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
    ],
    current: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  const addContact = contact => {
    contact.id = uuid.v4();
    dispatch({ type: "ADD_CONTACT", payload: contact });
  };

  const deleteContact = id => dispatch({ type: "DELETE_CONTACT", payload: id });

  const setCurrent = contact =>
    dispatch({ type: SET_CURRENT, payload: contact });

  const clearCurrent = () => dispatch({ type: CLEAR_CURRENT });

  return (
    <ContactContext.Provider
      value={{ ...state, addContact, deleteContact, setCurrent, clearCurrent }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
