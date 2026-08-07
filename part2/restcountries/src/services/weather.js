import axios from 'axios';

const apiKey = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY;

const baseUrl = `https://api.openweathermap.org/data/2.5`;

// Note: API requests by city name has been deprecated.
const getByCityName = (cityName) => {
  const request = axios.get(
    `${baseUrl}/weather?q=${cityName}&units=metric&appid=${apiKey}`,
  );
  return request.then((res) => res.data);
};

// Note: I can't use this because the Rest Countries API only provides the latitude and longitude
// of the first capital for countries with multiple capitals.
const getByLatLng = (lat, lon) => {
  const request = axios.get(
    `${baseUrl}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`,
  );
  return request.then((res) => res.data);
};

export default { getByCityName, getByLatLng };
