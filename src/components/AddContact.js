import React, { useState } from "react";

const AddContact = ({ addContactHandler }) => {
  const [state, setState] = useState({ name: "", email: "" });

  const add = (e) => {
    e.preventDefault();
    if (state.name === "" || state.email === "") {
      alert("ALl the fields are mandatory!");
      return;
    }
    addContactHandler(state);
    setState({ name: "", email: "" });
  };

  return (
    <div className="ui main">
      <h2>Add Contact</h2>
      <form className="ui form" onSubmit={add}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={state.name}
            onChange={(e) => setState({ name: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={state.email}
            onChange={(e) => setState({ email: e.target.value })}
          />
        </div>
        <button className="ui button blue">Add</button>
      </form>
    </div>
  );
};

export default AddContact;
