import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number: 123, id: 1 }]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");



  const addPerson = (event) => {

    event.preventDefault();
    console.log("button clicked", event.target);

    let found = 0;

    //current object
    const personObject = {
      name: newName,
      number: newNumber,
    };

    //check if they exist already
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        found = 1;
      }
    }

    // if they don't exist
    if (found == 0) {
      setPersons(persons.concat(personObject));

    }

    //if they do exist
    if (found == 1) {
      window.alert(newName + " is already in the phonebook");
    }

    // reset the value of newName for next addition
    setNewName("");
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);

    // event.target.value refers to the elements value that triggered the event

    //
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {

    console.log(event.target.value);

    // event.target.value refers to the elements value that triggered the event
    setNewNumber(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addPerson}>
        <div>
          {/* input value changed to newName which is ian initial useState value
          onChange required to be able to edit input field - we need an event handler
          that syncs changes made to input with component's state */}
          name: <input value={newName} onChange={handleNameChange} />
        </div>

        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <div>
        {" "}
        {persons.map((person) => (
          <div key={person.name}> {person.name} {person.number} </div>
        ))}
      </div>
    </div>
  );
};

export default App;
