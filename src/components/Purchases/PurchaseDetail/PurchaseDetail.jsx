import styles from "./PurchaseDetail.module.scss";

import defaultProductPicture from "../../../assets/img/defaultProductPicture.jpg";

import { useParams } from "react-router";
import { useState, useEffect, useRef } from "react";

import { Link } from "react-router-dom";
import { VentaService } from "../../../services/VentaService";
import { CustomDataTable } from "../../CustomDataTable/CustomDataTable";
import { Column } from "primereact/column";

export function PurchaseDetail() {
  const { compraId } = useParams();
  const [productosVenta, setProductosVenta] = useState([]);
  const dt = useRef();

  const cols = [
    { field: "producto", header: "Producto" },
    { field: "cantidad", header: "Cantidad" },
    { field: "precioUnitario", header: "Precio Unitario" },
    { field: "subtotal", header: "Subtotal" },
  ];

  useEffect(() => {
    const fetchSaleProducts = async () => {
      const response = await VentaService.buscarVentaPorId(compraId);
      const productosVenta = response.productosVenta.map((productoVenta) => {
        return {
          producto: productoVenta.producto.nombre,
          imagen: productoVenta.producto.imagen,
          cantidad: productoVenta.cantidad,
          precioUnitario: productoVenta.precioUnitario,
          subtotal: productoVenta.precioUnitario * productoVenta.cantidad,
        };
      });
      setProductosVenta(productosVenta);
    };
    fetchSaleProducts();
  }, [compraId]);

  const imageBodyTemplate = (producto) => {
    return (
      <img
        src={producto.imagen !== "" ? producto.imagen : defaultProductPicture}
        alt={producto.producto}
        className={styles.tablePicture}
      />
    );
  };

  return (
    <div className={styles.purchaseDetail}>
      <div className={styles.header}>
        <Link to="/compras" className={`btn btn-verde ${styles.btnRegresar}`}>
          Regresar
        </Link>
      </div>
      <CustomDataTable
        dt={dt}
        cols={cols}
        filename="DetalleCompra"
        ref={dt}
        value={productosVenta}
      >
        <Column field="producto" header="Producto" sortable />
        <Column body={imageBodyTemplate} header="Foto" />
        <Column field="cantidad" header="Cantidad" sortable />
        <Column field="precioUnitario" header="Precio unitario" sortable />
        <Column field="subtotal" header="Subtotal" />
      </CustomDataTable>
    </div>
  );
}
