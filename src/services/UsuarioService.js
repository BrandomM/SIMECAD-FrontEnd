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
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  },

  registrarUsuario: async (usuario) => {
    if (usuario.foto) {
      const formData = new FormData();

      formData.append("foto", usuario.foto);

      formData.append("nombre", usuario.nombre);
      formData.append("celular", usuario.celular);
      formData.append("correo", usuario.correo);
      formData.append("rol", usuario.rol);

      return await axios
        .post(API + "/registrarConFoto", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          return true;
        })
        .catch((error) => {
          console.log(error);
          return false;
        });
    } else {
      return await axios
        .post(API + "/registrar", usuario)
        .then((response) => {
          return true;
        })
        .catch((error) => {
          console.log(error);
          return false;
        });
    }
  },
};
