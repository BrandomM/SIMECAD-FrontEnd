import axios from "axios";

const {REACT_APP_API_ENDPOINT} = process.env;
const API = REACT_APP_API_ENDPOINT + "/api/login";

export const LoginService = {
  registro: async ({
    nombreRegistro,
    celularRegistro,
    correoRegistro,
    contrasenaRegistro,
  }) => {
    const usuario = {
      nombre: nombreRegistro,
      celular: celularRegistro,
      correo: correoRegistro,
      contrasena: contrasenaRegistro,
    };

    return await axios
      .post(API + "/registro", usuario)
      .then((response) => {
        return true;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  login: async ({ correoLogin, contrasenaLogin }) => {
    const credenciales = { correo: correoLogin, contrasena: contrasenaLogin };

    return await axios
      .post(API + "/login", credenciales)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  logout: () => {
    localStorage.clear();
  },

  getUsuario: () => {
    console.log(JSON.parse(localStorage.usuario));
    return JSON.parse(localStorage.usuario);
  },
};
