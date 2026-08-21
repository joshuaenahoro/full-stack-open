import axios from 'axios';
// const baseUrl = 'http://localhost:3001/persons';
const baseUrl = '/api/persons';

const getAll = () => axios.get(baseUrl).then((res) => res.data);

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((res) => res.data);
};

const deleteById = (id) => axios.delete(`${baseUrl}/${id}`);

const update = (person) => {
  const request = axios.put(`${baseUrl}/${person.id}`, person);
  return request.then((res) => res.data);
};

export default {
  getAll,
  create,
  deleteById,
  update,
};
