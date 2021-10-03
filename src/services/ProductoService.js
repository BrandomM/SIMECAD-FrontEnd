import axios from "axios";

const API = "http://localhost:8080/api/producto";

export const ProductoService = {
  listarProductos: async () => {
    return axios
      .get(API + "/listar")
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  listarProductosDisponibles: async () => {
    return axios
      .get(API + "/listar-disponibles")
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  buscarProductoPorId: async (id) => {
    return await axios
      .get(API + "/id/" + id)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  registrarProducto: async (producto) => {
    if (producto.foto) {
      const formData = new FormData();

      formData.append("foto", producto.foto);
      formData.append("nombre", producto.nombre);
      formData.append("precio", producto.precio);
      formData.append("disponibilidad", producto.disponibilidad);
      formData.append("estado", producto.estado);
      formData.append("descripcion", producto.descripcion);
      formData.append("categoria", producto.categoria);

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
        .post(API + "/registrar", producto)
        .then((response) => {
          return true;
        })
        .catch((error) => {
          console.log(error);
          return false;
        });
    }
  },
  eliminarProducto: async (producto) => {
    return await axios
      .delete(API + "/eliminar", { data: producto })
      .then((response) => {
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  },
  importarProductos: async (listaProductos) => {
    return await axios
      .post(API + "/importar", listaProductos)
      .then((response) => {
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  },
  actualizarProducto: async (producto) => {
    if (producto.foto) {
      const formData = new FormData();

      formData.append("foto", producto.foto);
      formData.append("nombre", producto.nombre);
      formData.append("precio", producto.precio);
      formData.append("disponibilidad", producto.disponibilidad);
      formData.append("estado", producto.estado);
      formData.append("descripcion", producto.descripcion);
      formData.append("categoria", producto.categoria);

      formData.append("id", producto.id);
      formData.append("imagen", producto.imagen);

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
        .put(API + "/modificar", producto)
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
