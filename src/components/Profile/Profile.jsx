import styles from "./Profile.module.scss";

import defaulUserPicture from "../../assets/img/defaultUserPicture.png";

import { useContext, useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useToast } from "../../hooks/useToast";
import { UserContext } from "../../context/UserContext";

import { UsuarioService } from "../../services/UsuarioService";

import { MainTitle } from "../MainTitle/MainTitle";
import { Input } from "../Form/Input/Input";
import { InputFile } from "../Form/InputFile/InputFile";
import { ConfirmDialog } from "../ConfirmDialog/ConfirmDialog";

export function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [usuario, setUsuario] = useState(null);

  const [formData, setFormData] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const [formDataPassword, setFormDataPassword] = useState({});
  const [showDialogPassword, setShowDialogPassword] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [previewPicture, setPreviewPicture] = useState(defaulUserPicture);

  useEffect(() => {
    const fetchUser = async () => {
      const usuario = await UsuarioService.buscarUsuarioPorId(user.id);
      setUsuario(usuario);
    };
    fetchUser();
  }, [user.id]);

  useEffect(() => {
    const setCurrentImage = () => {
      if (usuario?.imagen) {
        setPreviewPicture(usuario.imagen);
      }
    };
    setCurrentImage();
  }, [usuario]);

  const toast = useToast();

  const methods = useForm();
  const methods2 = useForm();

  const onSubmit = (data) => {
    setFormData(data);
    setShowDialog(true);
  };

  const confirm = async () => {
    setShowDialog(false);
    toast("info", "Se está actualizando el perfil");
    const updateProfileRequest = {
      id: usuario?.id,
      nombre: formData?.nombre,
      celular: formData?.celular,
      foto: formData?.foto,
    };

    const updatedUser = await UsuarioService.actualizarPerfil(updateProfileRequest);
    if (updatedUser) {
      toast("success", "Perfil actualizado con éxito");
      setUser(updatedUser);
    } else {
      toast("danger", "Ocurrió un problema durante la actualización");
    }
    methods.reset();
  };

  const cancel = () => {
    setShowDialog(false);
  };

  const onSubmitPassword = (data) => {
    setFormDataPassword(data);
    setShowDialogPassword(true);
  };

  const confirmPassword = async () => {
    setShowDialogPassword(false);

    if (formDataPassword.contrasena1 !== formDataPassword.contrasena2) {
      toast("danger", "Las contraseñas no coinciden");
      setIsInvalidPassword(true);
      return;
    }
    setIsInvalidPassword(false);

    toast("info", "Se está actualizando la contraseña");

    const updatePasswordRequest = {
      id: usuario?.id,
      contrasena: formDataPassword?.contrasena1,
      nuevaContrasena: formDataPassword?.contrasenaNueva,
    };
    const wasUpdated = await UsuarioService.actualizarContrasena(
      updatePasswordRequest
    );
    if (wasUpdated) {
      toast("success", "Contraseña actualizada con éxito");
    } else {
      toast("danger", "Ocurrió un problema durante la actualización");
    }
    methods2.reset();
  };

  const cancelPassword = () => {
    setShowDialogPassword(false);
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
    <div className={styles.profile}>
      <MainTitle label="Perfil" />
      <div className={styles.gridContainer}>
        <div className={styles.userForm}>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              encType="multipart/form-data"
            >
              <Input
                type="text"
                label="Nombre"
                name="nombre"
                required
                value={usuario?.nombre ? usuario.nombre : ""}
              />
              <Input
                type="text"
                label="Celular"
                name="celular"
                required
                minLength="10"
                maxLength="10"
                value={usuario?.celular ? usuario.celular : ""}
              />
              <InputFile name="foto" label="Foto" onChange={imageHandler} />
              <div className={styles.buttonContainer}>
                <input
                  type="submit"
                  className="btn btn-azulOscuro"
                  value="Actualizar perfil"
                />
              </div>
            </form>
          </FormProvider>
          <FormProvider {...methods2}>
            <form onSubmit={methods2.handleSubmit(onSubmitPassword)}>
              <Input
                type="password"
                label="Contraseña"
                name="contrasena1"
                isInvalid={isInvalidPassword}
                required
              />
              <Input
                type="password"
                label="Repetir Contraseña"
                name="contrasena2"
                isInvalid={isInvalidPassword}
                required
              />
              <Input
                type="password"
                label="Contraseña nueva"
                name="contrasenaNueva"
                required
              />
              <div className={styles.buttonContainer}>
                <input
                  type="submit"
                  className="btn btn-azulOscuro"
                  value="Cambiar contraseña"
                />
              </div>
            </form>
          </FormProvider>
        </div>
        <div className={`card ${styles.picture}`}>
          <img
            src={previewPicture}
            className={`card-img-top ${styles.profilePicture}`}
            alt="..."
          />
        </div>
      </div>
      <ConfirmDialog
        show={showDialog}
        confirm={() => confirm()}
        cancel={() => cancel()}
        type="confirm"
        message={"¿Desea actualizar el perfil?"}
      />
      <ConfirmDialog
        show={showDialogPassword}
        confirm={() => confirmPassword()}
        cancel={() => cancelPassword()}
        type="confirm"
        message={"¿Desea actualizar la contraseña?"}
      />
    </div>
  );
}
