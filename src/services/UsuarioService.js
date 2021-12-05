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

  buscarUsuarioPorId: async (id) => {
    return await axios
      .get(API + "/id/" + id)
      .then((response) => {
        return response.data;
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

  eliminarUsuario: async (usuario) => {
    return await axios
      .delete(API + "/eliminar", { data: usuario })
      .then((response) => {
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  },
  actualizarUsuario: async (usuario) => {
    if (usuario.foto) {
      const formData = new FormData();

      formData.append("foto", usuario.foto);

      formData.append("nombre", usuario.nombre);
      formData.append("celular", usuario.celular);
      formData.append("correo", usuario.correo);
      formData.append("rol", usuario.rol);
      formData.append("contrasena", usuario.contrasena);
      formData.append("imagen", usuario.imagen);
      formData.append("id", usuario.id);

      return await axios
        .put(API + "/modificarConFoto", formData, {
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
        .put(API + "/modificar", usuario)
        .then((response) => {
          return true;
        })
        .catch((error) => {
          console.log(error);
          return false;
        });
    }
  },
  actualizarPerfil: async (usuario) => {
    if (usuario.foto) {
      const formData = new FormData();

      formData.append("foto", usuario.foto);

      formData.append("nombre", usuario.nombre);
      formData.append("celular", usuario.celular);
      formData.append("id", usuario.id);

      return await axios
        .put(API + "/actualizarPerfilConFoto", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          return false;
        });
    } else {
      return await axios
        .put(API + "/actualizarPerfil", usuario)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          return false;
        });
    }
  },
  actualizarContrasena: async (usuario) => {
    return await axios
      .put(API + "/actualizarContrasena", usuario)
      .then((response) => {
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  },
};
