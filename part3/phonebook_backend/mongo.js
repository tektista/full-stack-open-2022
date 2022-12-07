const mongoose = require("mongoose");

if (process.argv.length < 2) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password> AND a name AND a number"
  );
  process.exit(1);
}

const password = encodeURIComponent(process.argv[2]);

const url = `mongodb+srv://tektista:${password}@cluster0.lj2jvsw.mongodb.net/personApp?retryWrites=true&w=majority`;

// how objects are to be stored in the personSchema variable
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

//Singular name of the model
const Person = mongoose.model("Person", personSchema);

if (process.argv.length > 2) {
  mongoose
    .connect(url)
    .then((result) => {
      console.log("connected");

      const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
      });

      return person.save();
    })
    .then(() => {
      console.log(`added ${process.argv[3]} number ${process.argv[4]}`);
      return mongoose.connection.close();
    })
    .catch((err) => console.log(err));
}

mongoose.connect(url);
Person.find({}).then((result) => {
  result.forEach((person) => {
    console.log(`${person.name} ${person.number}`);
  });
  mongoose.connection.close();
});
