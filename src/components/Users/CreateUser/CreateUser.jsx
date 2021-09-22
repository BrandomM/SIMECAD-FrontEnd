import styles from "./CreateUser.module.scss";

import defaulUserPicture from "../../../assets/img/defaultUserPicture.png";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useToast } from "../../../hooks/useToast";

import { UsuarioService } from "../../../services/UsuarioService";

import { Input } from "../../Form/Input/Input";
import { Select } from "../../Form/Select/Select";
import { InputFile } from "../../Form/InputFile/InputFile";
import { ConfirmDialog } from "../../ConfirmDialog/ConfirmDialog";
import { Link } from "react-router-dom";

export function CreateUser() {
  const [formData, setFormData] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const [previewPicture, setPreviewPicture] = useState(defaulUserPicture);

  const methods = useForm();
  const toast = useToast();

  const onSubmit = (data) => {
    setFormData(data);
    setShowDialog(true);
  };

  const confirm = async () => {
    setShowDialog(false);
    toast("info", "Se está registrando el usuario");
    const wasRegistered = await UsuarioService.registrarUsuario(formData);
    if (wasRegistered) {
      toast("success", "Usuario registrado con éxito");
    } else {
      toast("danger", "Ocurrió un problema en el registro");
    }
    methods.reset();
  };

  const cancel = () => {
    setShowDialog(false);
  };

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewPicture(reader.result);
      }
    };
    console.log("Algo");
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className={styles.createUser}>
      <div className={styles.header}>
        <Link
          to="/usuarios"
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
                type="text"
                label="Celular"
                name="celular"
                required
                minLength="10"
                maxLength="10"
              />
              <Input type="email" label="Correo" name="correo" required />
              <Select label="Rol" name="rol">
                <option value="Cliente">Cliente</option>
                <option value="Empleado">Empleado</option>
                <option value="Administrador">Administrador</option>
              </Select>
              <InputFile
                name="foto"
                label="Foto"
                onChange={imageHandler}
              />
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
            message={"¿Desea registrar el usuario?"}
          />
        </FormProvider>
        <div className={`card ${styles.picture}`}>
          <img
            src={previewPicture}
            className={`card-img-top ${styles.profilePicture}`}
            alt="..."
          />
        </div>
      </div>
    </div>
  );
}
