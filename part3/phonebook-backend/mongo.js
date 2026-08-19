const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('provide password as argument');
  process.exit(1);
}

// Using Googles' public DNS because
// the default server on my local machine fails to resolve
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const uri = `mongodb+srv://joshuaenahoro_db_user:${password}@cluster0.mwpmmeg.mongodb.net/?appName=Cluster0`;
mongoose.set('strictQuery', false);
mongoose.connect(uri, { family: 4 });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 5) {
  const person = new Person({ name, number });

  person.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}

if (process.argv.length === 3) {
  console.log('phonebook:');
  Person.find({}).then((result) => {
    result.forEach(({ name, number }) => {
      console.log(name, number);
    });
    mongoose.connection.close();
  });
}
