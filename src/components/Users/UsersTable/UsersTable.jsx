import styles from "./UsersTable.module.scss";

import defaultUserPicture from "../../../assets/img/defaultUserPicture.png";

import { useRef, useState, useEffect } from "react";

import { UsuarioService } from "../../../services/UsuarioService";

import { Link, useRouteMatch } from "react-router-dom";
import { CsvReader } from "../../CsvReader/CsvReader";
import { CustomDataTable } from "../../CustomDataTable/CustomDataTable";
import { Column } from "primereact/column";

export function UsersTable() {
  const [usuarios, setUsuarios] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);
  const dt = useRef(null);

  let match = useRouteMatch();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await UsuarioService.listarUsuarios();
      setUsuarios(response);
    };
    fetchUsers();
    setUpdateTable(false);
  }, [updateTable]);

  const cols = [
    { field: "nombre", header: "Nombre" },
    { field: "celular", header: "Celular" },
    { field: "correo", header: "Correo" },
    { field: "rol", header: "Rol" },
  ];

  const csvImportCols = ["nombre", "celular", "correo", "rol"];
  const numberCols = [];

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
    <div className={styles.usersTable}>
      <div className={styles.header}>
        <CsvReader
          importFunction={UsuarioService.importarUsuarios}
          csvImportCols={csvImportCols}
          numberCols={numberCols}
          updateTable={setUpdateTable}
        />
        <Link
          to={`${match.path}/registrar`}
          className={`btn btn-verde ${styles.btnAgregar}`}
        >
          Registrar usuario
        </Link>
      </div>
      <CustomDataTable
        value={usuarios}
        dt={dt}
        cols={cols}
        filename="Usuarios"
        ref={dt}
      >
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
