const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator");

const url = `mongodb+srv://tektista:password12345@cluster0.lj2jvsw.mongodb.net/personApp?retryWrites=true&w=majority`;

console.log("connecting to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    "error connnecting to MongoDB:", error.message;
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: numberValidator
  },
});

function numberValidator(val) {
  return (/(0([1-9]{1,2})-([0-9]{7}))|(0([0-9]{2})-([0-9]{8}))/).test(val)
}

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
