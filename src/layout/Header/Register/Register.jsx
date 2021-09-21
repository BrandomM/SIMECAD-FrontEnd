import styles from "./Register.module.scss";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useToast } from "../../../hooks/useToast";
import { useTranslation } from "react-i18next";

import { LoginService } from "../../../services/LoginService";

import { Input } from "../../../components/Form/Input/Input";


export function Register({ show, cancel, showLogin }) {
  const methods = useForm();
  const [isInvalid, setIsInvalid] = useState(false);
  const toast = useToast();
  const { t } = useTranslation();
  const T = (key) => t("register." + key);

  if (!show) {
    return <></>;
  }

  const onSubmit = async (data) => {
    const wasRegistered = await LoginService.registro(data);
    if (wasRegistered) {
      setIsInvalid(false);
      toast("success", T("toasts.success"));
      methods.reset();
    } else {
      setIsInvalid(true);
      toast("danger", T("toasts.danger"));
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
                    type="text"
                    label={T("inputs.name")}
                    name="nombreRegistro"
                    required
                  />
                  <Input
                    type="text"
                    label={T("inputs.mobile")}
                    name="celularRegistro"
                    minLength="10"
                    maxLength="10"
                  />
                  <Input
                    type="email"
                    label={T("inputs.email")}
                    name="correoRegistro"
                    required
                    isInvalid={isInvalid}
                  />
                  <Input
                    type="password"
                    label={T("inputs.password")}
                    name="contrasenaRegistro"
                    required
                    minLength="5"
                  />
                  <p
                    onClick={() => displayLogin()}
                    className={`link-azulOscuro ${styles.pointer}`}
                  >
                    {T("loginSwitch")}
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
                  className={"btn btn-azulClaro"}
                  value={T("signIn")}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
