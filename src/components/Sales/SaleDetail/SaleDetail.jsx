import styles from "./SaleDetail.module.scss";

import defaultProductPicture from "../../../assets/img/defaultProductPicture.jpg";

import { useParams } from "react-router";
import { useState, useRef, useEffect } from "react";

import { VentaService } from "../../../services/VentaService";

import { Link } from "react-router-dom";
import { CustomDataTable } from "../../CustomDataTable/CustomDataTable";
import { Column } from "primereact/column";

export function SaleDetail() {
  const { ventaId } = useParams();
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
      const response = await VentaService.buscarVentaPorId(ventaId);
      if (response) {
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
      }
    };
    fetchSaleProducts();
  }, [ventaId]);

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
    <div className={styles.saleDetail}>
      <div className={styles.header}>
        <Link to="/ventas" className={`btn btn-verde ${styles.btnRegresar}`}>
          Regresar
        </Link>
      </div>
      <CustomDataTable
        dt={dt}
        cols={cols}
        filename="DetalleVenta"
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
