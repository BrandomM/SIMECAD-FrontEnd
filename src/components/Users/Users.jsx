import styles from "./Users.module.scss";

import defaultUserPicture from "../../assets/img/defaultUserPicture.png";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRef } from "react";

import { UsuarioService } from "../../services/UsuarioService";

import { MainTitle } from "../MainTitle/MainTitle";
import { CustomDataTable } from "../CustomDataTable/CustomDataTable";
import { Column } from "primereact/column";

export function Users() {
  const [usuarios, setUsuarios] = useState([]);
  const dt = useRef(null);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await UsuarioService.listarUsuarios();
      setUsuarios(response);
    };
    fetchUsers();
  }, []);

  const cols = [
    { field: "nombre", header: "Nombre" },
    { field: "celular", header: "Celular" },
    { field: "correo", header: "Correo" },
    { field: "rol", header: "Rol" },
  ];

  const imageBodyTemplate = (usuario) => {
    return (
      <img
        src={usuario.imagen !== "" ? usuario.imagen : defaultUserPicture}
        alt={usuario.nombre}
        className={styles.tablePicture}
      />
    );
  };

  return (
    <div className={styles.users}>
      <MainTitle label={t("users.title")} />
      <CustomDataTable value={usuarios} dt={dt} cols={cols} filename="Usuarios" ref={dt}>
        <Column
          field="nombre"
          header="Nombre"
          sortable
          filter
          filterPlaceholder="Buscar por nombre"
        />
        <Column body={imageBodyTemplate} header="Foto" />
        <Column field="celular" header="Celular" sortable />
        <Column field="correo" header="Correo" sortable />
        <Column field="rol" header="Rol" sortable />
      </CustomDataTable>
    </div>
  );
}
