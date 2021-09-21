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
          <i class={`bi bi-bullseye ${styles.icon}`} />
          <p className={styles.informationText}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis,
            saepe. Quibusdam rem provident esse eaque in maiores nemo laboriosam
            quisquam, natus asperiores dolores, nobis quas ab illo molestiae
            sapiente laborum!
          </p>
        </div>

        <div className={`card ${styles.card} ${styles.vision}`}>
          <h3>{T("vision.title")}</h3>
          <i class={`bi bi-eye ${styles.icon}`} />
          <p className={styles.informationText}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis,
            saepe. Quibusdam rem provident esse eaque in maiores nemo laboriosam
            quisquam, natus asperiores dolores, nobis quas ab illo molestiae
            sapiente laborum!
          </p>
        </div>

        <div className={`card ${styles.card} ${styles.history}`}>
          <h3 className={`${styles.title}`}>{T("experience.title")}</h3>
          <img src={historia} alt="..." className={styles.picture} />
          <p className={styles.information}>
            Nuestra empresa lleva funcionando desde el año Lorem ipsum dolor
            sit, amet consectetur adipisicing elit. Mollitia sunt possimus
            deleniti blanditiis architecto suscipit obcaecati reiciendis vitae
            dolore eaque id velit delectus corporis enim excepturi modi iure
            quas officia rerum minima natus, eius ratione. Suscipit iste quis
            sunt, aliquid enim veniam, nam sed quibusdam sit consectetur eius
            nobis quia! Inventore odio suscipit non illo iste libero cupiditate
            dolor natus. Ipsum delectus porro totam cumque architecto.
          </p>
        </div>
      </div>
    </div>
  );
}
