import React from "react";

const Person = props => {
  return (
    <ul>
      <li>
        {props.person.name} {props.person.number}
        <button onClick={event => props.handleRemove(event, props.person)}>
          delete
        </button>
      </li>
    </ul>
  );
};

const Persons = props =>
  props.persons
    .filter(person =>
      person.name.toLowerCase().includes(props.value.toLowerCase())
    )
    .map(person => (
      <Person
        key={person.id}
        person={person}
        handleRemove={props.handleRemove}
      />
    ));

export default Persons;
