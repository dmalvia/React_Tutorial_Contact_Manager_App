import React,{useRef} from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
  const inputEl = useRef("");
  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };
  const updateContact = (id) => {
    props.getUpdateId(id);
  };
  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHandler={deleteContactHandler}
        key={contact.id}
        updateHandler={updateContact}
      />
    );
  });

  const getSearchTerm = () => {
    props.searchKeyWord(inputEl.current.value);
  };

  return (
    <div>
      <div className="contact">
        <h2>Contact list</h2>
        <Link to="/add">
          <button className="ui button blue ">Add Contact</button>
        </Link>
      </div>
      <div className="ui search">
          <div className="ui icon input">
            <input
             ref={inputEl}
              type="text"
              placeholder="Search Contacts"
              className="prompt"
              value={props.term}
              onChange={getSearchTerm}
            />
            <i className="ui search icon"></i>
          </div>
        </div>
      <div className="ui celled list">{renderContactList.length>0 ? renderContactList : "no contacts available"}</div>
    </div>
  );
};

export default ContactList;
