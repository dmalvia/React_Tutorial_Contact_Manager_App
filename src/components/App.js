import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import EditContact from "./EditContact";
import ContactDetail from "./ContactDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? [])
  );

  const addContactHandler = (contact) => {
    setContacts([...contacts, { id: uuid(), ...contact }]);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  const updateContactHandler = (Name) => {
    const Uname = contacts.find((element) => element.id === Name.id);
    console.log(Uname);

    // const upcontacts = contacts.filter((element) => element.id !== Name.id);
    // setContacts(upcontacts);
    // setContacts((prev) => [
    //   ...prev,
    //   { id: Name.id, name: Name.newName, email: Name.newEmail },
    // ]);
    setContacts(
      contacts.map((elem) => {
        return elem.id === Name.id
          ? { ...{ name: Name.newName, email: Name.newEmail, id: Name.id } }
          : elem;
      })
    );
  };
  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) =>{
        return Object.values(contact)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    })
    setSearchResults(newContactList);
    }else{
      searchResults(contacts)
    }
  }

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    const retrieveContacts = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)
    );
    if (retrieveContacts) setContacts(retrieveContacts);
  }, []);

  return (
    <Router>
      <div className="ui container">
        <Header />
        <Routes>
          <Route
            exact
            path="/add"
            element={<AddContact addContactHandler={addContactHandler} />}
          />
          <Route
            path="/"
            element={
              <ContactList
                contacts={searchTerm.length < 1 ? contacts :searchResults}
                getContactId={removeContactHandler}
                updateContactHandler={updateContactHandler}
                term={searchTerm}
                searchKeyWord={searchHandler}
              />
            }
          />
          <Route
            path="/edit"
            element={
              <EditContact updateContactHandler={updateContactHandler} />
            }
          />
          <Route path="/contact/:id" element={<ContactDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
