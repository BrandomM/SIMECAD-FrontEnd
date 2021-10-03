import axios from "axios";

const API = "http://localhost:8080/api/venta";

export const VentaService = {
  listarVentas: async () => {
    return axios
      .get(API + "/listar")
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  buscarVentaPorId: async (id) => {
    return await axios
      .get(API + "/id/" + id)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  registrarVenta: async (venta) => {
    return await axios
      .post(API + "/registrar", venta)
      .then((response) => {
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  },
  eliminarVenta: async (venta) => {
    return await axios
      .delete(API + "/eliminar", { data: venta })
      .then((response) => {
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  },
  actualizarVenta: async (venta) => {
    return await axios
      .put(API + "/modificar", venta)
      .then((response) => {
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  },
  ventasPorIdUsurio: async (id) => {
    return await axios
      .get(API + "/usuario/" + id)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
