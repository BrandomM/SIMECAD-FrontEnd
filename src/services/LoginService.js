import axios from "axios";

const API = "http://localhost:8080//api/auth";

export const LoginService = {
  registro: (usuario) => {
    axios
      .post(API + "/registro", usuario)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  login: ({ correo, contrasena }) => {
    axios
      .post(API + "/login", { correo, contrasena })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
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
