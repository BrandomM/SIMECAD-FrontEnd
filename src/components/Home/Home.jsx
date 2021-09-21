import styles from "./Home.module.scss";

import carrusel1 from "../../assets/img/carrusel1.jpg";
import carrusel2 from "../../assets/img/carrusel2.jpg";
import carrusel3 from "../../assets/img/carrusel3.jpg";

import home1 from "../../assets/img/home1.jpg";
import home2 from "../../assets/img/home2.jpg";
import home3 from "../../assets/img/home3.jpg";

import { useState } from "react";

import { Carousel } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export function Home() {
  const { t } = useTranslation();
  const T = (key) => t("home." + key);

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className={styles.home}>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img className="d-block w-100" src={carrusel1} alt="..." />
          <Carousel.Caption>
            <h3>{T("carousel.slide1.title")}</h3>
            <p className={styles.carouselSubtitle}>
              {T("carousel.slide1.subtitle")}
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={carrusel2} alt="..." />
          <Carousel.Caption>
            <h3>{T("carousel.slide2.title")}</h3>
            <p className={styles.carouselSubtitle}>
              {T("carousel.slide2.subtitle")}
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={carrusel3} alt="..." />
          <Carousel.Caption>
            <h3>{T("carousel.slide3.title")}</h3>
            <p className={styles.carouselSubtitle}>
              {T("carousel.slide3.subtitle")}
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className={`card ${styles.card}`}>
        <img src={home1} alt="..." className={styles.picture} />
        <div className={styles.information}>
          <h3 className={styles.informationTitle}>
            {T("cards.card1.title")}
          </h3>
          <p className={styles.informationText}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis,
            saepe. Quibusdam rem provident esse eaque in maiores nemo laboriosam
            quisquam, natus asperiores dolores, nobis quas ab illo molestiae
            sapiente laborum!
          </p>
          <div className={styles.informationButton}>
            <button className={`btn btn-azulClaro`}>
              {T("cards.card1.button")}
            </button>
          </div>
        </div>
      </div>

      <div className={`card ${styles.card}`}>
        <img src={home2} alt="..." className={styles.picture} />
        <div className={styles.information}>
          <h3 className={styles.informationTitle}>
            {T("cards.card2.title")}
          </h3>
          <p className={styles.informationText}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis,
            saepe. Quibusdam rem provident esse eaque in maiores nemo laboriosam
            quisquam, natus asperiores dolores, nobis quas ab illo molestiae
            sapiente laborum!
          </p>
          <div className={styles.informationButton}>
            <button className={`btn btn-verde ${styles.textWhite}`}>
              {T("cards.card2.button")}
            </button>
          </div>
        </div>
      </div>

      <div className={`card ${styles.card}`}>
        <img src={home3} alt="..." className={styles.picture} />
        <div className={styles.information}>
          <h3 className={styles.informationTitle}>
            {T("cards.card3.title")}
          </h3>
          <p className={styles.informationText}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis,
            saepe. Quibusdam rem provident esse eaque in maiores nemo laboriosam
            quisquam, natus asperiores dolores, nobis quas ab illo molestiae
            sapiente laborum!
          </p>
          <div className={styles.informationButton}>
            <button className={`btn btn-naranja ${styles.textWhite}`}>
              {T("cards.card3.button")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
