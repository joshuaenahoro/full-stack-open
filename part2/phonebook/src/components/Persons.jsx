const Persons = ({ persons, handleDelete }) => {
  if (persons.length === 0) {
    return <div>No numbers found.</div>;
  }

  return (
    <div>
      {persons.map((p) => (
        <div key={p.id}>
          {p.name} {p.number}
          {` `}
          <button onClick={() => handleDelete(p.name, p.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
