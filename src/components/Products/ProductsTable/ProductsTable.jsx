import styles from './ProductsTable.module.scss';

import defaultProductPicture from "../../../assets/img/defaultProductPicture.jpg";

import { useState, useRef, useEffect } from 'react';
import { useToast } from '../../../hooks/useToast';
import { useRouteMatch } from 'react-router';

import { ProductoService } from "../../../services/ProductoService";

import { Link } from 'react-router-dom';
import { CsvReader } from "../../CsvReader/CsvReader";
import { CustomDataTable } from "../../CustomDataTable/CustomDataTable";
import { Column } from "primereact/column";
import { ConfirmDialog } from '../../ConfirmDialog/ConfirmDialog';

export function ProductsTable() {
    const [productos, setProductos] = useState([]);
    const [updateTable, setUpdateTable] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({ nombre: "" });
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const toast = useToast();
  
    const dt = useRef(null);
  
    let match = useRouteMatch();
  
    useEffect(() => {
      const fetchProducts = async () => {
        const response = await ProductoService.listarProductos();
        setProductos(response);
      };
      fetchProducts();
      setUpdateTable(false);
    }, [updateTable]);
  
    const cols = [
      { field: "nombre", header: "Nombre" },
      { field: "precio", header: "Precio" },
      { field: "disponibilidad", header: "Disponibilidad" },
      { field: "estado", header: "Estado" },
      { field: "descripcion", header: "Descripción"},
      { field: "categoria", header: "Categoría" }
    ];
  
    const csvImportCols = ["nombre", "precio", "disponibilidad", "estado", "descripcion", "categoria"];
    const numberCols = ["precio", "disponibilidad"];
  
    const imageBodyTemplate = (producto) => {
      return (
        <img
          src={producto.imagen !== "" ? producto.imagen : defaultProductPicture}
          alt={producto.nombre}
          className={styles.tablePicture}
        />
      );
    };
  
    const actionsBodyTemplate = (producto) => {
      return (
        <>
          <Link
            className={`btn btn-azulClaro px-3 mx-2`}
            to={"/productos/editar/" + producto.id}
          >
            Editar
          </Link>
          <button className={`btn btn-rojo`} onClick={() => onDelete(producto)}>
            Eliminar
          </button>
        </>
      );
    };
  
    const onDelete = (producto) => {
      setSelectedProduct(producto);
      setShowDeleteDialog(true);
    };
  
    const cancelDelete = () => {
      setShowDeleteDialog(false);
    };
  
    const deleteProduct = () => {
      const wasDeleted = ProductoService.eliminarProducto(selectedProduct);
      if (wasDeleted) {
        toast("success", "Producto eliminado exitosamente");
      } else {
        toast("danger", "No se pudo eliminar el producto");
      }
      setShowDeleteDialog(false);
      setUpdateTable(true);
    };
  
    return (
      <div className={styles.productsTable}>
        <div className={styles.header}>
          <CsvReader
            importFunction={ProductoService.importarProductos}
            csvImportCols={csvImportCols}
            numberCols={numberCols}
            updateTable={setUpdateTable}
          />
          <Link
            to={`${match.path}/registrar`}
            className={`btn btn-verde ${styles.btnAgregar}`}
          >
            Registrar producto
          </Link>
        </div>
        <CustomDataTable
          value={productos}
          dt={dt}
          cols={cols}
          filename="Productos"
          ref={dt}
        >
          <Column
            field="nombre"
            header="Nombre"
            sortable
            filter
            filterPlaceholder="Buscar por nombre"
          />
          <Column body={imageBodyTemplate} header="Foto" />
          <Column field="precio" header="Precio" sortable />
          <Column field="disponibilidad" header="Disponibilidad" sortable />
          <Column field="estado" header="Estado" sortable />
          <Column field="descripcion" header="Descripción" sortable />
          <Column field="categoria" header="Categoría" sortable />
          <Column body={actionsBodyTemplate} />
        </CustomDataTable>
  
        <ConfirmDialog
          show={showDeleteDialog}
          cancel={cancelDelete}
          type="delete"
          message={`¿Desea eliminar el producto ${selectedProduct.nombre}?`}
          confirm={deleteProduct}
        />
      </div>
    );
}