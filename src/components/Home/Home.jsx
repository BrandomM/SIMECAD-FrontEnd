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
import { Link } from "react-router-dom";

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
          <h3 className={styles.informationTitle}>{T("cards.card1.title")}</h3>
          <p className={styles.informationText}>
            Ofrecemos toda clase de servicios para su vehículo. Reparaciones de bombas de inyección, inyectores, cajas de cambios, sincronización, entre otros. No dude en ponerse en contacto con nosotros para consolidar una fecha y lugar
          </p>
          <div className={styles.informationButton}>
            <Link to="/contacto" className={`btn btn-azulClaro`}>
              {T("cards.card1.button")}
            </Link>
          </div>
        </div>
      </div>

      <div className={`card ${styles.card}`}>
        <img src={home2} alt="..." className={styles.picture} />
        <div className={styles.information}>
          <h3 className={styles.informationTitle}>{T("cards.card2.title")}</h3>
          <p className={styles.informationText}>
            Vendemos repuestos con precios que se ajustan a su presupuesto. Cada uno de ellos está ampliamente garantizado, tanto los nuevos como los de segunda mano. Nuestra especialidad son las bombas de inyección, sin embargo, tenemos disponibilidad de toda clase de partes para vehículos diesel
          </p>
          <div className={styles.informationButton}>
            <Link
              to="/productos"
              className={`btn btn-verde ${styles.textWhite}`}
            >
              {T("cards.card2.button")}
            </Link>
          </div>
        </div>
      </div>

      <div className={`card ${styles.card}`}>
        <img src={home3} alt="..." className={styles.picture} />
        <div className={styles.information}>
          <h3 className={styles.informationTitle}>{T("cards.card3.title")}</h3>
          <p className={styles.informationText}>
            Tenemos una amplia trayectoria en el mercado. Lo contamos sobre nuestra historia, nuestros valores y hacia a dónde apuntamos. Todo para brindarle la mejor atención
          </p>
          <div className={styles.informationButton}>
            <Link
              to="/nosotros"
              className={`btn btn-naranja ${styles.textWhite}`}
            >
              {T("cards.card3.button")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
