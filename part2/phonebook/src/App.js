import { useEffect, useState } from "react";
import Filter from "./components/filter";
import PersonForm from "./components/personform";
import Persons from "./components/persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [filterName, setNewFilterName] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfuilled");
      setPersons(response.data);
    });
  }, []);

  console.log("render", persons.length, "persons");

  const addPerson = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);

    let found = false;

    //object to be added
    const personObject = {
      name: newName,
      number: newNumber,
    };

    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        found = true;
      }
    }

    if (found === false) {
      axios
        .post("http://localhost:3001/persons", personObject)
        .then((response) => {
          console.log("HELLO");
          console.log(response.data);
          setPersons(persons.concat(response.data));
          setNewName("");
        });
    } else {
      window.alert(`${newName} is already in the phonebook`);
      setNewName("");
    }
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
    setNewNumber(event.target.value);
  };

  //
  const handleFilterChange = (event) => {
    console.log(event.target.value);

    // event.target.value refers to the elements value that triggered the event
    setNewFilterName(event.target.value);
  };

  const changeShowAll = () => {
    setShowAll(!showAll);
    console.log(showAll);
  };

  const namesToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(filterName.toLowerCase())
      );

  // const names = () => {
  //   {
  //     namesToShow.map((person) => (
  //       <div key={person.name}>
  //         {person.name} {person.number}
  //       </div>
  //     ));
  //   }
  // };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter inputValue={filterName} onChangeFunction={handleFilterChange} />

      {/* <div>
        filter shown with <input onChange={handleFilterChange}></input>
      </div>

      <button onClick={changeShowAll}> filter </button> */}

      <h2> add a new </h2>

      <PersonForm
        onSubmitFunction={addPerson}
        nameInputValue={newName}
        nameInputOnChangeFunction={handleNameChange}
        numberInputValue={newNumber}
        numberInputOnChangeFunction={handleNumberChange}
      />

      {/* <form onSubmit={addPerson}>
        <div>
         
          name: <input value={newName} onChange={handleNameChange} />
        </div>

        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form> */}

      <h2>Numbers</h2>

      <Persons persons={namesToShow} />

      <div></div>
    </div>
  );
};

export default App;
