import React, { Fragment, useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {
    return <h4>No contacts found.</h4>;
  }

  const items = filtered ? filtered : contacts;
  return (
    <Fragment>
      <TransitionGroup>
        {items.map(contact => (
          <CSSTransition key={contact._id} timeout={500} classNames="item">
            <ContactItem contact={contact} key={contact._id} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Contacts;
