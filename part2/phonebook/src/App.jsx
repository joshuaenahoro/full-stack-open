import { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
  ]);
  const [query, setQuery] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleAddNote = (e) => {
    e.preventDefault();
    const names = persons.map((p) => p.name.toLowerCase());

    if (names.includes(newName.toLowerCase())) {
      return alert(`${newName} is already added to phonebook`);
    }

    setPersons((p) => [
      ...p,
      { name: newName, number: newNumber, id: persons.length + 1 },
    ]);
    setNewName('');
    setNewNumber('');
  };

  const handleQueryChange = (e) => setQuery(e.target.value);
  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);

  const filteredPersons = persons.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={query} onChange={handleQueryChange} />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={handleAddNote}
        nameValue={newName}
        onNameChange={handleNameChange}
        numberValue={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
