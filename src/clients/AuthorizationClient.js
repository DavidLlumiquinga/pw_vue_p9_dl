import axios from "axios";

const URL = "http://localhost:8083";

const getToken = async (username, password, rol) => {
  try {
    const response = await axios.post(`${URL}/token`, {
      user: username,
      password: password,
      role: rol
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener el token:", error);
    throw error;
  }
};

export const getTokenFachada = async (username, password, rol) => {
  return await getToken(username, password, rol);
}