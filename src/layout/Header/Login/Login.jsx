import styles from "./Login.module.scss";

import { useState } from "react/cjs/react.development";
import { useForm, FormProvider } from "react-hook-form";
import { useToast } from "../../../hooks/useToast";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

import { LoginService } from "../../../services/LoginService";

import { Input } from "../../../components/Form/Input/Input";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";

export function Login({ show, cancel, showRegister }) {
  const { setUser } = useContext(UserContext);
  const methods = useForm();
  const [isInvalid, setIsInvalid] = useState(false);
  const toast = useToast();
  const { t } = useTranslation();
  const T = (key) => t("login." + key);
  const history = useHistory();

  if (!show) {
    return <></>;
  }

  const onSubmit = async (data) => {
    const loginResponse = await LoginService.login(data);
    if (loginResponse) {
      setIsInvalid(false);
      toast("success", T("toasts.success"));
      methods.reset();
      cancel();
      setUser(loginResponse.usuarioDTO);
      history.push("/");
    } else {
      setIsInvalid(true);
      toast("danger", T("toasts.danger"));
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
                <h5 className="modal-title">{T("title")}</h5>
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
                    label={T("inputs.email")}
                    name="correoLogin"
                    required
                    isInvalid={isInvalid}
                  />
                  <Input
                    type="password"
                    label={T("inputs.password")}
                    name="contrasenaLogin"
                    required
                    isInvalid={isInvalid}
                  />
                  <p
                    onClick={() => displayRegister()}
                    className={`link-azulOscuro ${styles.pointer}`}
                  >
                    {T("registerSwitch")}
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
                  {T("cancel")}
                </button>
                <input
                  type="submit"
                  //   onClick={() => confirm()}
                  className={"btn btn-azulClaro"}
                  value={T("login")}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
