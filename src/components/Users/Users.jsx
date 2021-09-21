import styles from "./Users.module.scss";

import defaultUserPicture from "../../assets/img/defaultUserPicture.png";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRef } from "react";

import { UsuarioService } from "../../services/UsuarioService";

import { MainTitle } from "../MainTitle/MainTitle";
import { CustomDataTable } from "../CustomDataTable/CustomDataTable";
import { Column } from "primereact/column";

import { FileUpload } from "primereact/fileupload";

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

  const csvImportCols = ["nombre", "celular", "correo", "rol"];
  const numberCols = ["celular"];



  const importCSV = (e) => {
    const file = e.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target.result;
      const data = csv.split("\n");

      let rows = data.map((row) => row.split(","));

      const usesQuotes = rows[0][0][0] === '"';

      if (usesQuotes) {
        rows = rows.map((row) =>
          row.map((word) => word.substr(1, word.length - 2))
        );
      }
      rows.shift();
      let jsonLike = [];
      rows.forEach((row) => {
        let object = {};
        for (let colNumber = 0; colNumber < csvImportCols.length; colNumber++) {
          object[csvImportCols[colNumber]] = row[colNumber];
          if (numberCols.includes(csvImportCols[colNumber])) {
            object[csvImportCols[colNumber]] = parseInt(row[colNumber]);
          }
        }
        jsonLike.push(object);
      });

      console.log(jsonLike);

      UsuarioService.importarUsuarios(jsonLike);
    };

    reader.readAsText(file, "UTF-8");
  };

  return (
    <div className={styles.users}>
      <MainTitle label={t("users.title")} />
      <FileUpload
        chooseOptions={{ label: "CSV", icon: "pi pi-file-o" }}
        mode="basic"
        name="demo[]"
        auto
        url="http://localhost:8080/api/fileupload/fileupload"
        accept=".csv"
        className="p-mr-2"
        onUpload={importCSV}
      />
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
