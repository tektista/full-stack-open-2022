const express = require("express");
const app = express();

app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const personsLength = persons.length;

app.get("/api/persons", (request, response) => {
  response.send(persons);
});

app.get("/info", (request, response) => {
  let phonebookLength = persons.length;
  const date = new Date();

  response.send(
    `<div>Phonebook has info for ${phonebookLength} people</div>
    <div> ${date} </div>`
  );
});

app.get("/info", (request, response) => {
  let phonebookLength = persons.length;
  const date = new Date();

  response.send(
    `<div>Phonebook has info for ${phonebookLength} people</div>
      <div> ${date} </div>`
  );
});

app.get(`/api/persons/:id`, (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => {
    return person.id === id;
  });

  if (response) {
    response.send(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  console.log(id);

  console.log(persons);
  persons = persons.filter((person) => person.id !== id);
  console.log(persons);

  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
