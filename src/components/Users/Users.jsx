import styles from "./Users.module.scss";

import defaultUserPicture from "../../assets/img/defaultUserPicture.png";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { UsuarioService } from "../../services/UsuarioService";

import { MainTitle } from "../MainTitle/MainTitle";
import { CustomDataTable } from "../CustomDataTable/CustomDataTable";
import { Column } from "primereact/column";

export function Users() {
  const [usuarios, setUsuarios] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await UsuarioService.listarUsuarios();
      setUsuarios(response);
    };
    fetchUsers();
  }, []);

  const imageBodyTemplate = (usuario) => {
    return (
      <img
        src={usuario.imagen !== "" ? usuario.imagen : defaultUserPicture}
        alt={usuario.nombre}
        className={styles.tablePicture}
      />
    );
  };

  const nombreBodyTemplate = (usuario) => {
    return (
      <>
        <span className="p-column-title">Nombre</span>
        {usuario.nombre}
      </>
    );
  };

  return (
    <div className={styles.users}>
      <MainTitle label={t("users.title")} />
      <CustomDataTable value={usuarios}>
        {/* <Column field="nombre" header="Nombre"></Column>
        <Column body={imageBodyTemplate} header="Foto"></Column>
        <Column field="celular" header="Celular"></Column>
        <Column field="correo" header="Correo"></Column>
        <Column field="rol" header="Rol"></Column> */}
      </CustomDataTable>
    </div>
  );
}
