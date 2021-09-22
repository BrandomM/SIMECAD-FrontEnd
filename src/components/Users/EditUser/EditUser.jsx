import styles from "./EditUser.module.scss";

import defaulUserPicture from "../../../assets/img/defaultUserPicture.png";

import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useToast } from "../../../hooks/useToast";

import { UsuarioService } from "../../../services/UsuarioService";

import { Link } from "react-router-dom";
import { Input } from "../../Form/Input/Input";
import { InputHidden } from "../../Form/InputHidden/InputHidden";
import { Select } from "../../Form/Select/Select";
import { InputFile } from "../../Form/InputFile/InputFile";
import { ConfirmDialog } from "../../ConfirmDialog/ConfirmDialog";

export function EditUser() {
  const { usuarioId } = useParams();
  const [usuarioEdit, setUsuarioEdit] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const usuario = await UsuarioService.buscarUsuarioPorId(usuarioId);
      setUsuarioEdit(usuario);
    };
    fetchUser();
  }, [usuarioId]);

  const [formData, setFormData] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const [previewPicture, setPreviewPicture] = useState(defaulUserPicture);

  const toast = useToast();

  const methods = useForm();

  const onSubmit = (data) => {
    setFormData(data);
    setShowDialog(true);
  };

  const confirm = async () => {
    setShowDialog(false);
    toast("info", "Se está actualizando el usuario");
    const wasUpdated = await UsuarioService.actualizarUsuario(formData);
    if (wasUpdated) {
      toast("success", "Usuario actualizado con éxito");
    } else {
      toast("danger", "Ocurrió un problema durante la actualización");
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
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className={styles.editUser}>
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
              <InputHidden
                name="id"
                value={usuarioEdit?.id ? usuarioEdit.id : ""}
              />
              <InputHidden
                name="contrasena"
                value={usuarioEdit?.contrasena ? usuarioEdit.contrasena : ""}
              />
              <InputHidden
                name="imagen"
                value={usuarioEdit?.imagen ? usuarioEdit.imagen : ""}
              />
              <Input
                type="text"
                label="Nombre"
                name="nombre"
                required
                value={usuarioEdit?.nombre ? usuarioEdit.nombre : ""}
              />
              <Input
                type="text"
                label="Celular"
                name="celular"
                required
                minLength="10"
                maxLength="10"
                value={usuarioEdit?.celular ? usuarioEdit.celular : ""}
              />
              <Input
                type="email"
                label="Correo"
                name="correo"
                required
                value={usuarioEdit?.correo ? usuarioEdit.correo : ""}
              />
              <Select label="Rol" name="rol" value={usuarioEdit?.rol}>
                <option value="Cliente">Cliente</option>
                <option value="Empleado">Empleado</option>
                <option value="Administrador">Administrador</option>
              </Select>
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
            message={"¿Desea actualizar el usuario?"}
          />
        </FormProvider>
        <div className={`card ${styles.picture}`}>
          <img
            src={usuarioEdit?.imagen ? usuarioEdit?.imagen : previewPicture}
            className={`card-img-top ${styles.profilePicture}`}
            alt="..."
          />
        </div>
      </div>
    </div>
  );
}
