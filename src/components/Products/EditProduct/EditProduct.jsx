import styles from "./EditProduct.module.scss";

import defaultProductPicture from "../../../assets/img/defaultProductPicture.jpg";

import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useToast } from "../../../hooks/useToast";
import { useParams } from "react-router";

import { ProductoService } from "../../../services/ProductoService";

import { Link } from "react-router-dom";
import { InputHidden } from "../../Form/InputHidden/InputHidden";
import { Input } from "../../Form/Input/Input";
import { Select } from "../../Form/Select/Select";
import { InputFile } from "../../Form/InputFile/InputFile";
import { ConfirmDialog } from "../../ConfirmDialog/ConfirmDialog";

export function EditProduct() {
  const { productoId } = useParams();
  const [productoEdit, setProductoEdit] = useState({});
  const [formData, setFormData] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const [previewPicture, setPreviewPicture] = useState(defaultProductPicture);

  const methods = useForm();
  const toast = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      const producto = await ProductoService.buscarProductoPorId(productoId);
      setProductoEdit(producto);
    };
    fetchProduct();
  }, [productoId]);

  const onSubmit = (data) => {
    setFormData(data);
    setShowDialog(true);
  };

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewPicture(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const confirm = async () => {
    setShowDialog(false);
    toast("info", "Se está actualizando el producto");
    const wasUpdated = await ProductoService.actualizarProducto(formData);
    if (wasUpdated) {
      toast("success", "Producto actualizado con éxito");
    } else {
      toast("danger", "Ocurrió un problema durante la actualización");
    }
    methods.reset();
  };

  const cancel = () => {
    setShowDialog(false);
  };

  return (
    <div className={styles.editProduct}>
      <div className={styles.header}>
        <Link
          to="/productos"
          className={`btn btn-verde my-3 ${styles.btnRegresar}`}
        >
          Regresar
        </Link>
      </div>
      <div className={styles.gridContainer}>
        <FormProvider {...methods}>
          <div className={styles.userForm}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              encType="multipart/form-data"
            >
              <InputHidden
                name="id"
                value={productoEdit?.id ? productoEdit.id : ""}
              />
              <InputHidden
                name="imagen"
                value={productoEdit?.imagen ? productoEdit.imagen : ""}
              />
              <Input
                type="text"
                label="Nombre"
                name="nombre"
                required
                value={productoEdit?.nombre ? productoEdit.nombre : ""}
              />
              <Input
                type="number"
                label="Precio"
                name="precio"
                required
                min="0"
                value={productoEdit?.precio ? productoEdit.precio : ""}
              />
              <Input
                type="number"
                label="Disponibilidad"
                name="disponibilidad"
                required
                min="0"
                value={
                  productoEdit?.disponibilidad
                    ? productoEdit.disponibilidad
                    : ""
                }
              />
              <Select
                label="Estado"
                name="estado"
                value={productoEdit?.estado ? productoEdit?.estado : ""}
              >
                <option value="Nuevo">Nuevo</option>
                <option value="Usado">Usado</option>
              </Select>

              <Input
                type="text"
                label="Descripción"
                name="descripcion"
                required
                value={
                  productoEdit?.descripcion ? productoEdit.descripcion : ""
                }
              />
              <Input
                type="text"
                label="Categoría"
                name="categoria"
                required
                value={productoEdit?.categoria ? productoEdit.categoria : ""}
              />

              <InputFile name="foto" label="Foto" onChange={imageHandler} />
              <div className={styles.buttonContainer}>
                <input
                  type="submit"
                  className="btn btn-azulOscuro"
                  value="Actualizar"
                />
              </div>
            </form>
          </div>
          <ConfirmDialog
            show={showDialog}
            confirm={() => confirm()}
            cancel={() => cancel()}
            type="confirm"
            message={"¿Desea actualizar el producto?"}
          />
        </FormProvider>
        <div className={`card ${styles.picture}`}>
          <img
            src={productoEdit?.imagen ? productoEdit?.imagen : previewPicture}
            className={`card-img-top ${styles.productPicture}`}
            alt="..."
          />
        </div>
      </div>
    </div>
  );
}
