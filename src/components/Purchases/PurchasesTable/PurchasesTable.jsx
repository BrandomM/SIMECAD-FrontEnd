import styles from "./PurchasesTable.module.scss";

import { useEffect, useRef, useState, useContext } from "react";

import { UserContext } from "../../../context/UserContext";
import { VentaService } from "../../../services/VentaService";

import { CustomDataTable } from "../../CustomDataTable/CustomDataTable";
import { Column } from "primereact/column";
import { Link } from "react-router-dom";

export function PurchasesTable() {
  const { user } = useContext(UserContext);
  const [compras, setCompras] = useState([]);
  const dt = useRef();

  const cols = [
    { field: "fecha", header: "Fecha" },
    { field: "productos", header: "Productos" },
    { field: "unidades", header: "Unidades" },
    { field: "total", header: "Total" },
  ];

  useEffect(() => {
    const fetchPurchases = async () => {
      const response = await VentaService.ventasPorIdUsurio(user.id);
      if (response) {
        const compras = response.map((compra) => {
          return {
            id: compra.id,
            fecha: compra.fecha,
            productos: compra.productosVenta.length,
            unidades: compra.productosVenta
              .map((productoVenta) => productoVenta.cantidad)
              .reduce((previousValue, currentValue) => {
                return previousValue + currentValue;
              }, 0),
            total: compra.productosVenta
              .map((productoVenta) => {
                return productoVenta.cantidad * productoVenta.precioUnitario;
              })
              .reduce((previousValue, currentValue) => {
                return previousValue + currentValue;
              }, 0),
          };
        });
        setCompras(compras);
      }
    };
    fetchPurchases();
  }, [user.id]);

  const actionsBodyTemplate = (compra) => {
    return (
      <>
        <Link
          className={`btn btn-azulClaro px-3 mx-2`}
          to={"/compras/" + compra.id}
        >
          Detalle
        </Link>
      </>
    );
  };

  return (
    <div className={styles.purchasesTable}>
      <CustomDataTable
        dt={dt}
        cols={cols}
        filename="Compras"
        ref={dt}
        value={compras}
      >
        <Column field="fecha" header="Fecha" sortable />
        <Column field="productos" header="Productos" sortable />
        <Column field="unidades" header="Unidades" sortable />
        <Column field="total" header="Total" sortable />
        <Column body={actionsBodyTemplate} />
      </CustomDataTable>
    </div>
  );
}
