require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

const app = express();

app.use(express.json());
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body'),
);
app.use(cors());
app.use(express.static('dist'));

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((result) => res.json(result))
    .catch((err) => next(err));
});

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => {
      person ? res.json(person) : res.status(404).end;
    })
    .catch((err) => next(err));
});

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body;

  // if (!name || !number) {
  //   return res.status(400).json({ error: 'name or number is missing' });
  // }

  const person = new Person({ name, number });
  person
    .save()
    .then((result) => res.json(result))
    .catch((err) => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
  // const { number } = req.body;

  // Person.findById(req.params.id)
  //   .then((person) => {
  //     if (!person) {
  //       return res.status(404).end;
  //     }

  //     person.number = number;

  //     return person.save().then((updatedPerson) => {
  //       res.json(updatedPerson);
  //     });
  //   })
  //   .catch((err) => next(err));

  // Use single update method
  Person.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { number: req.body.number } },
    {
      returnDocument: 'after', // get updated document
      runValidators: true,
    },
  )
    .then((updatedPerson) => res.json(updatedPerson))
    .catch((err) => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => res.status(204).end)
    .catch((err) => next(err));
});

app.get('/info', (req, res, next) => {
  Person.find({})
    .then((results) => {
      res.send(
        `<p>Phonebook has info for ${results.length} people</p><p>${Date()}</p>`,
      );
    })
    .catch((err) => next(err));
});

// Error middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Sever running on port ${PORT}`);
});
