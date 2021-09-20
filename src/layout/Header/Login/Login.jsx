import styles from "./Login.module.scss";

import { useState } from "react/cjs/react.development";
import { useForm, FormProvider } from "react-hook-form";
import { useToast } from "../../../hooks/useToast";

import { LoginService } from "../../../services/LoginService";

import { Input } from "../../../components/Form/Input/Input";

export function Login({ show, cancel, showRegister }) {
  const methods = useForm();
  const [isInvalid, setIsInvalid] = useState(false);

  const toast = useToast();

  if (!show) {
    return <></>;
  }

  const onSubmit = async (data) => {
    const usuarioLogin = await LoginService.login(data);
    if (usuarioLogin) {
      setIsInvalid(false);
      toast("success", "Inicio de sesión exitoso");
      methods.reset();
      cancel();
    } else {
      setIsInvalid(true);
      toast("danger", "Correo o contraseña inválidos");
    }
  };

  const displayRegister = () => {
    cancel();
    showRegister();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className={styles.login}>
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Iniciar sesión</h5>
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
                    type="email"
                    label="Correo"
                    name="correoLogin"
                    required
                    isInvalid={isInvalid}
                  />
                  <Input
                    type="password"
                    label="Contraseña"
                    name="contrasenaLogin"
                    required
                    isInvalid={isInvalid}
                  />
                  <p
                    onClick={() => displayRegister()}
                    className={`link-azulOscuro ${styles.pointer}`}
                  >
                    ¿No tienes una cuenta? Regístrate
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
                  value="Ingresar"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
