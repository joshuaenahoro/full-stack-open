const Result = ({ result, onShow }) => {
  if (result.length === 0) return;

  if (result.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (result.length === 1) {
    const country = result[0];
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>Capital: {country.capital.join(', ')}</div>
        <div>Area: {country.area}</div>
        <h2>Languages</h2>
        <ul>
          {Object.entries(country.languages).map(([key, value]) => (
            <li key={key}>{value}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} width={200} />
      </div>
    );
  }

  return (
    <div>
      {result.map((country) => (
        <div key={country.cca2}>
          {country.name.common}
          <button onClick={() => onShow(country.name.common)}>Show</button>
        </div>
      ))}
    </div>
  );
};

export default Result;
