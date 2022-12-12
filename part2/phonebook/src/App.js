import { useEffect, useState } from "react";
import Filter from "./components/filter";
import PersonForm from "./components/personform";
import Persons from "./components/persons";
import axios from "axios";
import personService from "./services/personsService";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="message">{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [filterName, setNewFilterName] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((response) => {
      console.log("promise fulfuilled");
      setPersons(response.data);
    });
  }, []);

  console.log("render", persons.length, "persons");

  const addPerson = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);

    //found var
    let found = false;

    //object to be added
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    //if person is found
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        found = true;
      }
    }

    if (found === false) {
      personService
        .create(personObject)
        .then((response) => {
          console.log("HELLO");
          console.log(response.data);
          setPersons(persons.concat(response.data));
          setMessage(`${newName} was succesfully added`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          setMessage(error.response.data.error);
        });
    }

    //if there is an existing person and their number does not equal the number thats typed in
    if (existingPerson && existingPerson.number !== newNumber) {

      
      if (
        window.confirm(
          `${newName} is already in the phonebook, replace the old number?`
        ) === true
      ) {
        const person = persons.find((person) => person.name === newName);
        const changedPerson = { ...person, number: newNumber };

        console.log(changedPerson);
        personService
          .update(person.id, changedPerson)
          .then((response) => {
            setPersons(
              persons.map((p) => (p.id !== person.id ? p : response.data))
            );

            setMessage(`${newName}'s number was succesfully updated`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setMessage(`${newName} ${error} has already been deleted from the server`);
          });
      }
    }

    if (existingPerson && existingPerson.number === newNumber) {
      alert(`${newName} is already added to phonebook`);
    }

    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`) === true) {
      personService.remove(id).then((response) => {
        console.log(response.data);

        setPersons(
          persons.filter((person) => {
            return person.id !== id;
          })
        );

        console.log(persons);
      });
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

      <h2> add a new </h2>

      <Notification message={message} />

      <PersonForm
        onSubmitFunction={addPerson}
        nameInputValue={newName}
        nameInputOnChangeFunction={handleNameChange}
        numberInputValue={newNumber}
        numberInputOnChangeFunction={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons persons={namesToShow} deleteOnClickHandler={deletePerson} />

      <div></div>
    </div>
  );
};

export default App;
