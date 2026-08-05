import { useEffect, useState } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [query, setQuery] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    personService.getAll().then((p) => setPersons(p));
  }, []);

  const handleAddPerson = (e) => {
    e.preventDefault();

    const existingPerson = persons.find(
      (p) => p.name.toLowerCase() === newName.toLowerCase(),
    );

    const resetForm = () => {
      setNewName('');
      setNewNumber('');
    };

    // Update person if they already exist
    if (existingPerson) {
      const confirmed = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`,
      );

      if (!confirmed) return;

      personService
        .update({ ...existingPerson, number: newNumber })
        .then((updatedPerson) => {
          setPersons(
            persons.map((p) =>
              p.id === existingPerson.id ? updatedPerson : p,
            ),
          );
          resetForm();
        });

      return;
    }

    // Add new entry
    personService.create({ name: newName, number: newNumber }).then((p) => {
      setPersons((prev) => prev.concat(p));
      resetForm();
    });
  };

  const handleQueryChange = (e) => setQuery(e.target.value);
  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);

  const handleDelete = (name, id) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService.deleteById(id);
      setPersons(persons.filter((p) => p.id !== id));
    }
  };

  const filteredPersons = persons.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={query} onChange={handleQueryChange} />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={handleAddPerson}
        nameValue={newName}
        onNameChange={handleNameChange}
        numberValue={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
