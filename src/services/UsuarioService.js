import axios from "axios";

const API = "http://localhost:8080/api/usuario";

export const UsuarioService = {
  listarUsuarios: async () => {
    return axios
      .get(API + "/listar")
      .then((response) => {
        return response.data;
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

  importarUsuarios: async (listaUsuarios) => {
    return await axios
      .post(API + "/importar", listaUsuarios)
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
