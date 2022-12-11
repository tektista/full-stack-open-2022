require("dotenv").config();
const express = require("express");
const app = express();
const Person = require("./models/person");

// const mongoose = require("mongoose");

const cors = require("cors");
const morgan = require("morgan");

app.use(express.static("build"));
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

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

app.get("/info", (request, response, next) => {
  const date = new Date();
  Person.find({})
    .then((persons) => {
      response.send(
        `<p>Phonebook has info for ${persons.length} people</p> <p>${date}</p>`
      );
    })
    .catch((error) => next(error));
});

app.get(`/api/persons/:id`, (request, response, next) => {
  // const id = Number(request.params.id);
  // const person = persons.find((person) => {
  //   return person.id === id;
  // });

  // if (response) {
  //   response.send(person);
  // } else {
  //   response.status(404).end();
  // }

  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.delete("/api/persons/:id", (request, response, next) => {
  // const id = Number(request.params.id);
  // console.log(id);

  // console.log(persons);
  // persons = persons.filter((person) => person.id !== id);
  // console.log(persons);

  // response.status(204).end();

  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// const generateId = () => {
//   const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;
//   return maxId + 1;
// };

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  // if (Person.find({ name: body.name } === true)) {
  //   return response.status(400).json({ error: "name already exists" });
  // }

  // if (!body.name) {
  //   return response.status(400).json({ error: "name missing" });
  // }

  // if (!body.number) {
  //   return response.status(400).json({ error: "number missing" });
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
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

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
console.log("Running ", PORT);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
