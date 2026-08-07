import { useEffect, useState } from 'react';
import Result from './components/Result';
import countriesService from './services/countries';

const App = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countriesService.getAll().then(setCountries);
  }, []);

  const handleQueryChange = (e) => setQuery(e.target.value);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(query.toLocaleLowerCase()),
  );

  return (
    <>
      <div>
        find countries{' '}
        <input type="search" value={query} onChange={handleQueryChange} />
      </div>
      <Result result={filteredCountries} />
    </>
  );
};

export default App;
