const mongoose = require('mongoose');

// Using Googles' public DNS because
// the default server on my local machine fails to resolve
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

mongoose.set('strictQuery', false);

const uri = process.env.MONGODB_URI;

console.log('connecting to', uri);

mongoose
  .connect(uri, { family: 4 })
  .then((result) => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
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
    validate: {
      validator: (v) => /^\d{2,3}-\d{5,}$/.test(v),
    },
    required: true,
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
