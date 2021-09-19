// import styles from "./Home.module.scss";

// import { useState, useEffect, useRef } from "react";
// import { Toast } from "bootstrap";
import { useToast } from "../../hooks/useToast";


export function Home() {
  const toast = useToast();

  return (
    <div>
      <button className="btn btn-verde" onClick={() => toast("success", "Mensaje enviado exitosamente")}>Toast success</button>
      <button className="btn btn-azulClaro" onClick={() => toast("info", "Nuevos productos disponibles")}>Toast info</button>
      <button className="btn btn-naranja" onClick={() => toast("warning", "Se eliminará de forma definitiva")}>Toast warning</button>
      <button className="btn btn-rojo" onClick={() => toast("danger", "No se pudo eliminar el registro")}>Toast danger</button>
    </div>
  );
}
