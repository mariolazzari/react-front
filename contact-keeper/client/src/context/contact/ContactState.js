import React, { useReducer } from "react";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import axios from "axios";
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  CLEAR_CONTACTS
} from "../types";

// component
const ContactState = props => {
  // state
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null
  };
  // reducer
  const [state, dispatch] = useReducer(contactReducer, initialState);

  // get all contacts
  const getContacts = async () => {
    try {
      const res = await axios.get("/api/contacts");
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // add new contact
  const addContact = async contact => {
    const config = {
      headers: {
        "Content-Yype": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/contacts", contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // delete contact
  const deleteContact = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // update contact
  const updateContact = async contact => {
    try {
      const res = await axios.put(`/api/contacts/${contact._id}`, contact);
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // set selected contact
  const setCurrent = contact =>
    dispatch({ type: SET_CURRENT, payload: contact });

  // reset selection
  const clearCurrent = () => dispatch({ type: CLEAR_CURRENT });

  // filter contacts
  const filterContacts = text =>
    dispatch({ type: FILTER_CONTACTS, payload: text });

  // clear filter
  const clearFilter = () => dispatch({ type: CLEAR_FILTER });

  // clear contacts
  const clearContacts = () => dispatch({ type: CLEAR_CONTACTS });

  return (
    <ContactContext.Provider
      value={{
        ...state,
        getContacts,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        clearContacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
