import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactForm = () => {
  const { addContact, current, clearCurrent, updateContact } = useContext(
    ContactContext
  );

  useEffect(() => {
    if (current) {
      // edit mode
      setContact(current);
    } else {
      // reset form
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal"
      });
    }
  }, [current]);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal"
  });

  const { name, email, phone, type } = contact;

  const onChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current) {
      // update contact
      updateContact(contact);
    } else {
      // add new cotnact
      addContact(contact);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current ? "Edit contact" : "Add contact"}
      </h2>
      <input
        type="text"
        placeholder="Contact name..."
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        placeholder="Contact eMail..."
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Contact phone..."
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}
      />{" "}
      Personal
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={onChange}
      />{" "}
      Professional
      <div>
        <button type="submit" className="btn btn-primary btn-block">
          {current ? "Edit" : "Add"}
        </button>
      </div>
      {current && (
        <div>
          <button
            type="submit"
            onClick={clearAll}
            className="btn btn-light btn-block"
          >
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
