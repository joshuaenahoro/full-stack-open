import CountryInfo from './CountryInfo';

const Result = ({ result, onShow }) => {
  if (result.length === 0) return;

  if (result.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (result.length === 1) {
    return <CountryInfo country={result[0]} />;
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
