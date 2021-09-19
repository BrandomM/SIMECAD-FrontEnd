// import styles from "./Home.module.scss";

import { useState } from "react";
import { useToast } from "../../hooks/useToast";
import { ConfirmDialog } from "../ConfirmDialog/ConfirmDialog";

export function Home() {
  const toast = useToast();

  const [showDialog, setShowDialog] = useState(false);

  const toggleDialog = () => {
    setShowDialog((prev) => !prev);
  };

  const confirm = () => {
    console.log("Confirm");
    setShowDialog(false);
    toast("info", "Ha confirmado la opción")
  };

  const cancel = () => {
    setShowDialog(false);
  }

  return (
    <div>
      <button
        className="btn btn-verde"
        onClick={() => toast("success", "Mensaje enviado exitosamente")}
      >
        Toast success
      </button>
      <button
        className="btn btn-azulClaro"
        onClick={() => toast("info", "Nuevos productos disponibles")}
      >
        Toast info
      </button>
      <button
        className="btn btn-naranja"
        onClick={() => toast("warning", "Se eliminará de forma definitiva")}
      >
        Toast warning
      </button>
      <button
        className="btn btn-rojo"
        onClick={() => toast("danger", "No se pudo eliminar el registro")}
      >
        Toast danger
      </button>

      <button className="btn btn-azulOscuro" onClick={() => toggleDialog()}>
        Confirm dialog
      </button>

      <ConfirmDialog
        show={showDialog}
        confirm={() => confirm()}
        cancel={() => cancel()}
        type="confirm"
        message={"¿Desea guardar cambios?"}
      />
    </div>
  );
}
