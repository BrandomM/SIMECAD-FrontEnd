import axios from "axios";

const API = "http://localhost:8080/api/usuario";

export const UsuarioService = {

  listarUsuarios: () => {
    axios
      .get(API + "/listar")
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  buscarUsuarioPorId: (id) => {
    axios
      .get(API + "/id/" + id)
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
