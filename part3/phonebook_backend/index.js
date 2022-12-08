require("dotenv").config();
const express = require("express");
const app = express();
const Person = require("./models/person");

// const mongoose = require("mongoose");

const cors = require("cors");
const morgan = require("morgan");
const { pluralize } = require("mongoose");

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(express.static("build"));

// let persons = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },

// const url = `mongodb+srv://tektista:password12345@cluster0.lj2jvsw.mongodb.net/personApp?retryWrites=true&w=majority`;

// const url = process.env.MONGODB_URI

// //connect to mongoose using URL
// // ALLOW PERMISSION ON MONGO DB ATLAS
// mongoose.connect(url);

// // how objects are to be stored in the personSchema variable
// const personSchema = new mongoose.Schema({
//   name: String,
//   number: String,
// });

// personSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

// //singular name of the model
// const Person = mongoose.model("Person", personSchema);

// // const personsLength = persons.length;

app.get("/api/persons", (request, response) => {
  // response.send(persons);
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

// app.get("/info", (request, response) => {
//   let phonebookLength = persons.length;
//   const date = new Date();

//   response.send(
//     `<div>Phonebook has info for ${phonebookLength} people</div>
//       <div> ${date} </div>`
//   );
// });

app.get(`/api/persons/:id`, (request, response) => {
  // const id = Number(request.params.id);
  // const person = persons.find((person) => {
  //   return person.id === id;
  // });

  // if (response) {
  //   response.send(person);
  // } else {
  //   response.status(404).end();
  // }

  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  console.log(id);

  console.log(persons);
  persons = persons.filter((person) => person.id !== id);
  console.log(persons);

  response.status(204).end();
});

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;
  return maxId + 1;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({ error: "name missing" });
  }

  if (!body.number) {
    return response.status(400).json({ error: "number missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
  // if (!body.name) {
  //   return response.status(400).json({
  //     error: "name missing",
  //   });
  // }

  // if (!body.number) {
  //   return response.status(400).json({
  //     error: "number missing",
  //   });
  // }

  // for (let i = 0; i < persons.length; i++) {
  //   if (persons[i].name.includes(body.name)) {
  //     return response.status(400).json({
  //       error: "name must be unique",
  //     });
  //   }
  // }

  // const person = {
  //   id: generateId(),
  //   name: body.name,
  //   number: body.number,
  // };

  // persons = persons.concat(person);
  // response.send(person);
});

const PORT = process.env.PORT || 3003;
console.log(PORT);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
