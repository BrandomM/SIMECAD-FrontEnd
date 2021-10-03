import styles from "./SalesTable.module.scss";

import { useState, useRef, useEffect } from "react";

import { VentaService } from "../../../services/VentaService";

import { Link } from "react-router-dom";
import { CustomDataTable } from "../../CustomDataTable/CustomDataTable";
import { Column } from "primereact/column";

export function SalesTable() {
  const [ventas, setVentas] = useState([]);
  const dt = useRef();

  const cols = [
    { field: "fecha", header: "Fecha" },
    { field: "cliente", header: "Cliente" },
    { field: "productos", header: "Productos" },
    { field: "unidades", header: "Unidades" },
    { field: "total", header: "Total" },
  ];

  useEffect(() => {
    const fetchSales = async () => {
      const response = await VentaService.listarVentas();
      const ventas = response.map((venta) => {
        return {
          id: venta.id,
          fecha: venta.fecha,
          cliente: venta.usuario.nombre,
          productos: venta.productosVenta.length,
          unidades: venta.productosVenta
            .map((productoVenta) => productoVenta.cantidad)
            .reduce((previousValue, currentValue) => {
              return previousValue + currentValue;
            }, 0),
          total: venta.productosVenta
            .map((productoVenta) => {
              return productoVenta.cantidad * productoVenta.precioUnitario;
            })
            .reduce((previousValue, currentValue) => {
              return previousValue + currentValue;
            }, 0),
        };
      });
      setVentas(ventas);
    };
    fetchSales();
  }, []);

  const actionsBodyTemplate = (venta) => {
    return (
      <>
        <Link
          className={`btn btn-azulClaro px-3 mx-2`}
          to={"/ventas/" + venta.id}
        >
          Detalle
        </Link>
      </>
    );
  };

  return (
    <div className={styles.salesTable}>
      <CustomDataTable
        dt={dt}
        cols={cols}
        filename="Ventas"
        ref={dt}
        value={ventas}
      >
        <Column field="fecha" header="Fecha" sortable />
        <Column
          field="cliente"
          header="Cliente"
          sortable
          filter
          filterPlaceholder="Buscar por nombre"
        />
        <Column field="productos" header="Productos" sortable />
        <Column field="unidades" header="Unidades" sortable />
        <Column field="total" header="Total" sortable />
        <Column body={actionsBodyTemplate} />
      </CustomDataTable>
    </div>
  );
}
