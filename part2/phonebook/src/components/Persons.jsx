const Persons = ({ persons }) => {
  if (persons.length === 0) {
    return <div>No numbers found.</div>;
  }

  return (
    <div>
      {persons.map((p) => (
        <div key={p.id}>
          {p.name} {p.number}
        </div>
      ))}
    </div>
  );
};

export default Persons;
