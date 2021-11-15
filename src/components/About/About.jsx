import styles from "./About.module.scss";

import historia from "../../assets/img/historia.jpg";

import { useTranslation } from "react-i18next";

import { MainTitle } from "../MainTitle/MainTitle";

export function About() {
  const { t } = useTranslation();
  const T = (key) => t("about." + key);

  return (
    <div className={styles.about}>
      <MainTitle label={T("title")} />

      <div className={styles.cardsContainer}>
        <div className={`card ${styles.card} ${styles.mision}`}>
          <h3>{T("mission.title")}</h3>
          <i className={`bi bi-bullseye ${styles.icon}`} />
          <p className={styles.informationText}>
            Hemos asumido el compromiso y la responsabilidad de realizar una
            excelente actividad comercial. Proporcionando servicios de calidad
            que cumplan con las expectativas de los clientes que depositan su
            confianza en nosotros
          </p>
        </div>

        <div className={`card ${styles.card} ${styles.vision}`}>
          <h3>{T("vision.title")}</h3>
          <i className={`bi bi-eye ${styles.icon}`} />
          <p className={styles.informationText}>
            Somos una empresa dedicada a nuestros cliente. Nos vemos como un
            negocio que se supera cada día, participando activamente con acciones,
            y soluciones innovadoras. Estaremos siempre a la
            vanguardia en el mundo de los repuestos de vehículos diesels
          </p>
        </div>

        <div className={`card ${styles.card} ${styles.history}`}>
          <h3 className={`${styles.title}`}>{T("experience.title")}</h3>
          <img src={historia} alt="..." className={styles.picture} />
          <p className={styles.information}>
            Nuestra empresa lleva operando desde el 2013. Comenzamos como una iniciativa para ofrecer servicios técnicos de reparación de bombas de inyección diesel, mientras que poco a poco incorporamos nuevas ofertas para nuestros clientes. En la actualidad brindamos servicios de reparación de cajas mecánicas, reconstrucción de piezas y vendemos una gran cantidad de repuestos de todas las marcas
          </p>
        </div>
      </div>
    </div>
  );
}
