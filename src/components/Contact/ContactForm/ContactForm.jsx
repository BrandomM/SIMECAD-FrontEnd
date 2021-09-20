import styles from "./ContactForm.module.scss";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm, FormProvider } from "react-hook-form";
import { useToast } from "../../../hooks/useToast";

import { EmailService } from "../../../services/EmailService";

import { Input } from "../../Form/Input/Input";
import { Textarea } from "../../Form/Textarea/Textarea";
import { ConfirmDialog } from "../../ConfirmDialog/ConfirmDialog";

export function ContactForm() {
  const { t } = useTranslation();
  const T = (key) => t("contact.form." + key);

  const methods = useForm();

  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({});

  const toast = useToast();

  const onSubmit = (data) => {
    setFormData(data);
    setShowDialog(true);
  };

  const confirm = async () => {
    setShowDialog(false);
    const wasSended = await EmailService.contacto(formData);
    if (wasSended) {
      toast("success", T("messageSuccess"));
    } else {
      toast("danger", T("messageFailure"));
    }
    methods.reset();
  };

  const cancel = () => {
    setShowDialog(false);
  };

  return (
    <FormProvider {...methods}>
      <div className={styles.contactForm}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Input type="text" label={T("name")} name="nombre" required />
          <Input type="email" label={T("email")} name="correo" required />
          <Textarea label={T("message")} name="mensaje" required />
          <div className={styles.buttonContainer}>
            <input
              type="submit"
              className="btn btn-azulOscuro"
              value={T("send")}
            />
          </div>
        </form>
      </div>
      <ConfirmDialog
        show={showDialog}
        confirm={() => confirm()}
        cancel={() => cancel()}
        type="confirm"
        message={T("confirmDialog")}
      />
    </FormProvider>
  );
}
