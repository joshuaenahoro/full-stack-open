import { useEffect, useState } from 'react';
import weatherService from '../services/weather';

const WeatherInfo = ({ cityName }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    weatherService.getByCityName(cityName).then(setWeather);
  }, [cityName]);

  if (!weather) return null;

  return (
    <>
      <h2>Weather in {cityName}</h2>
      <div>Temperature: {weather.main.temp} Celsius</div>
      {weather.weather.map(({ id, icon, description }) => (
        <img
          src={`https://openweathermap.org/payload/api/media/file/${icon}.png`}
          alt={description}
          key={id}
        />
      ))}
      <div>Wind: {weather.wind.speed} m/s</div>
    </>
  );
};

export default WeatherInfo;
