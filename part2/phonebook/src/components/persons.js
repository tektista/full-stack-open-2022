import React from "react";

const Persons = ({ persons, deleteOnClickHandler }) => (
  <>
    <div>
      {persons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}{" "}
          <button
            onClick={() => {
              deleteOnClickHandler(person.id, person.name);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  </>
);

export default Persons;
