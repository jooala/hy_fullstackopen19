import React, { useState, useEffect } from "react";
import Persons from "./components/PersonsList";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [notificationStatus, setNotificationStatus] = useState(null);

  const addPerson = event => {
    event.preventDefault();
    setNotificationStatus("confirm");
    setErrorMessage(`Added ${newName}`);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);

    const personObject = {
      name: newName,
      number: newNumber
    };
    const foundPerson = persons.find(person => person.name === newName);
    if (foundPerson) {
      window.confirm(
        `${newName} is already added to phonebook., replace the number with a new one?`
      );
      personService
        .update(foundPerson.id, personObject)
        .then(updatedPerson => {
          setNewName("");
          setNewNumber("");
          setPersons(
            persons.map(person =>
              person.id !== foundPerson.id ? person : updatedPerson
            )
          );
        })
        .catch(error => {
          setNotificationStatus("error");
          setErrorMessage(
            `Information of ${newName} has already been removed from server`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    } else {
      personService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };
  const handleRemove = (event, person) => {
    event.preventDefault();
    if (window.confirm(`Poistetaanko ${person.name}`)) {
      personService.remove(person.id).then(() => {
        setPersons(persons.filter(personList => personList.id !== person.id));
      });
    }
  };
  const handlePerson = event => {
    setNewName(event.target.value);
  };

  const handleNumber = event => {
    setNewNumber(event.target.value);
  };

  const handleFilter = event => {
    setNewFilter(event.target.value);
  };

  useEffect(() => {
    console.log("effect");
    personService.getAll().then(initialPersons => {
      console.log("promise fulfilled");
      setPersons(initialPersons);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} status={notificationStatus} />
      <Filter newFilter={newFilter} handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm
        persons={persons}
        addPerson={addPerson}
        newName={newName}
        handlePerson={handlePerson}
        newNumber={newNumber}
        handleNumber={handleNumber}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        value={newFilter}
        handleRemove={handleRemove}
      />
    </div>
  );
};

export default App;
