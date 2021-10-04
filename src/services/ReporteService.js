import axios from "axios";

const API = "http://localhost:8080/api/reporte";

export const ReporteService = {
  reporteProductos: async () => {
    return axios
      .get(API + "/producto")
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  reporteCategorias: async () => {
    return axios
      .get(API + "/categoria")
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  reporteClientes: async () => {
    return axios
      .get(API + "/cliente")
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
