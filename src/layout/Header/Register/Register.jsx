import styles from "./Register.module.scss";

import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import { useToast } from "../../../hooks/useToast";
import { Input } from "../../../components/Form/Input/Input";

import { LoginService } from "../../../services/LoginService";

export function Register({ show, cancel, showLogin }) {
  const methods = useForm();
  const [isInvalid, setIsInvalid] = useState(false);

  const toast = useToast();

  if (!show) {
    return <></>;
  }

  const onSubmit = async (data) => {
    const wasRegistered = await LoginService.registro(data);
    if (wasRegistered) {
      setIsInvalid(false);
      toast("success", "Registro exisoto");
      methods.reset();
    } else {
      setIsInvalid(true);
      toast("danger", "El correo ya está en uso");
    }
  };

  const displayLogin = () => {
    cancel();
    showLogin();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className={styles.register}>
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Registro</h5>
                <button
                  type="button"
                  onClick={() => cancel()}
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className={styles.form}>
                  <Input
                    type="text"
                    label="Nombre"
                    name="nombreRegistro"
                    required
                  />
                  <Input
                    type="text"
                    label="Celular"
                    name="celularRegistro"
                    minLength="10"
                    maxLength="10"
                  />
                  <Input
                    type="email"
                    label="Correo"
                    name="correoRegistro"
                    required
                    isInvalid={isInvalid}
                  />
                  <Input
                    type="password"
                    label="Contraseña"
                    name="contrasenaRegistro"
                    required
                    minLength="5"
                  />
                  <p
                    onClick={() => displayLogin()}
                    className={`link-azulOscuro ${styles.pointer}`}
                  >
                    ¿Ya tienes una cuenta? Inicia sesión
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => cancel()}
                  className="btn btn-blanco"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
                <input
                  type="submit"
                  //   onClick={() => confirm()}
                  className={"btn btn-azulClaro"}
                  value="Registrarse"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
