import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = event => {
    event.preventDefault();
    if (persons.find(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        id: persons.length + 1,
        name: newName,
        number: newNumber
      };
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    }
  };
  const handlePerson = event => {
    setNewName(event.target.value);
  };

  const handleNumber = event => {
    setNewNumber(event.target.value);
  };

  const handleFilter = event => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const Person = props => {
    return (
      <div>
        <p>
          {props.person.name} {props.person.number}
        </p>
      </div>
    );
  };
  const rows = props =>
    persons.map(person => <Person key={person.id} person={person} />);

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={newName} onChange={handleFilter} />
      </div>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePerson} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {rows()}
    </div>
  );
};

export default App;
