import styles from "./CreateProduct.module.scss";

import defaultProductPicture from "../../../assets/img/defaultProductPicture.jpg";

import { useState } from "react";
import { Link } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { useToast } from "../../../hooks/useToast";

import { ProductoService } from "../../../services/ProductoService";

import { Input } from "../../Form/Input/Input";
import { Select } from "../../Form/Select/Select";
import { InputFile } from "../../Form/InputFile/InputFile";
import { ConfirmDialog } from "../../ConfirmDialog/ConfirmDialog";

export function CreateProduct() {
  const [formData, setFormData] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const [previewPicture, setPreviewPicture] = useState(defaultProductPicture);

  const methods = useForm();
  const toast = useToast();

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
    toast("info", "Se está registrando el producto");
    const wasRegistered = await ProductoService.registrarProducto(formData);
    if (wasRegistered) {
      toast("success", "Producto registrado con éxito");
    } else {
      toast("danger", "Ocurrió un problema en el registro");
    }
    methods.reset();
  };

  const cancel = () => {
    setShowDialog(false);
  };

  return (
    <div className={styles.createProduct}>
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
              <Input type="text" label="Nombre" name="nombre" required />
              <Input
                type="number"
                label="Precio"
                name="precio"
                required
                min="0"
              />
              <Input
                type="number"
                label="Disponibilidad"
                name="disponibilidad"
                required
                min="0"
              />

              <Select label="Estado" name="estado">
                <option value="Nuevo">Nuevo</option>
                <option value="Usado">Usado</option>
              </Select>

              <Input
                type="text"
                label="Descripción"
                name="descripcion"
                required
              />
              <Input type="text" label="Categoría" name="categoria" required />

              <InputFile name="foto" label="Foto" onChange={imageHandler} />
              <div className={styles.buttonContainer}>
                <input
                  type="submit"
                  className="btn btn-azulOscuro"
                  value="Registrar"
                />
              </div>
            </form>
          </div>
          <ConfirmDialog
            show={showDialog}
            confirm={() => confirm()}
            cancel={() => cancel()}
            type="confirm"
            message={"¿Desea registrar el prodcuto?"}
          />
        </FormProvider>
        <div className={`card ${styles.picture}`}>
          <img
            src={previewPicture}
            className={`card-img-top ${styles.productPicture}`}
            alt="..."
          />
        </div>
      </div>
    </div>
  );
}
