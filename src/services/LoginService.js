import axios from "axios";

const API = "http://localhost:8080/api/login";

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
    console.log(correoLogin + contrasenaLogin);
    const credenciales = { correo: correoLogin, contrasena: contrasenaLogin };

    return await axios
      .post(API + "/login", credenciales)
      .then((response) => {
        // localStorage.setItem("token", response.data.token);
        // localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
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
