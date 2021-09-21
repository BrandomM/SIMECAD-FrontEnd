import styles from "./Users.module.scss";

import defaultUserPicture from "../../assets/img/defaultUserPicture.png";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRef } from "react";

import { UsuarioService } from "../../services/UsuarioService";

import { MainTitle } from "../MainTitle/MainTitle";
import { CustomDataTable } from "../CustomDataTable/CustomDataTable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";

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

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(usuarios);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      saveAsExcelFile(excelBuffer, "products");
    });
  };

  const cols = [
    { field: "nombre", header: "Nombre" },
    { field: "celular", header: "Celular" },
    { field: "correo", header: "Correo" },
    { field: "rol", header: "Rol" },
  ];

  const exportColumns = cols.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(exportColumns, usuarios);
        doc.save("products.pdf");
      });
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((FileSaver) => {
      let EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data = new Blob([buffer], {
        type: EXCEL_TYPE,
      });
      FileSaver.saveAs(
        data,
        fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  };

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
      <div className="export-buttons">
        <Button
          type="button"
          icon="pi pi-file-o"
          onClick={() => exportCSV(false)}
          className="p-mr-2"
          data-pr-tooltip="CSV"
        />
        <Button
          type="button"
          icon="pi pi-file-excel"
          onClick={exportExcel}
          className="p-button-success p-mr-2"
          data-pr-tooltip="XLS"
        />
        <Button
          type="button"
          icon="pi pi-file-pdf"
          onClick={exportPdf}
          className="p-button-warning p-mr-2"
          data-pr-tooltip="PDF"
        />
      </div>
      <Tooltip target=".export-buttons>button" position="bottom" />
      <CustomDataTable value={usuarios} ref={dt}>
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
