import axios from "axios";

const URL = "http://localhost:8082/concecionario/api/v1.0/vehiculo";

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const guardar = async (body) => {
  const data = await axios
    .post(`${URL}`, body, { headers: getAuthHeader() })
    .then((r) => r.data);
  console.log(data);
  return data;
};

const seleccionarTodos = async () => {
  const data = await axios.get(`${URL}`, { headers: getAuthHeader() }).then((r) => r.data);
  return data;
}

const eliminar = async (id) => {
  const data = await axios.delete(`${URL}/${id}`, { headers: getAuthHeader() }).then((r) => r.data);
  return data;
}

export const fachadaSeleccionarTodos = async () => {
  return await seleccionarTodos();
}

export const fachadaGuardar = async (body) => {
  return await guardar(body);
}

export const fachadaEliminar = async (id) => {
  return await eliminar(id);
}