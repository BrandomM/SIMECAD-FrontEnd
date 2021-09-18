import styles from "./ContactForm.module.scss";

import { useTranslation } from "react-i18next";
import { useForm, FormProvider } from "react-hook-form";
import { Input } from "../../Form/Input/Input";
import { Textarea } from "../../Form/Textarea/Textarea";

export function ContactForm() {
  const { t } = useTranslation();
  const T = (key) => t("contact.form." + key);

  const methods = useForm();
  const onSubmit = (data) => console.log(data);

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
    </FormProvider>
  );
}
