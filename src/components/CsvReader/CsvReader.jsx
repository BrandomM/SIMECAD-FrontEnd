// import styles from "./CsvReader.module.scss";

import { useToast } from "../../hooks/useToast";

import { FileUpload } from "primereact/fileupload";
import { useTranslation } from "react-i18next";

const API = "http://localhost:8080/api/fileupload/fileupload";

export function CsvReader({ importFunction, csvImportCols, numberCols = [], updateTable }) {
  const toast = useToast();
  const { t } = useTranslation();
  const T = (key) => t("customDataTable.csvImport." + key)

  const importCSV = async (e) => {
    const file = e.files[0];
    const reader = new FileReader();
    reader.onload = async (e) => {
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

      const wereImported = await importFunction(jsonLike);
      if (wereImported) {
        toast("success", T("success"));
        updateTable(true);
      } else {
        toast("danger", T("danger"));
      }
    };
    reader.readAsText(file, "UTF-8");
  };

  return (
    <div className="d-flex">
      <strong>Importar</strong>
      <div className="mx-3">
        <FileUpload
          chooseOptions={{ label: "CSV", icon: "pi pi-file-o" }}
          mode="basic"
          name="demo[]"
          auto
          url={API}
          accept=".csv"
          className="p-mr-2"
          onUpload={importCSV}
        />
      </div>
    </div>
  );
}
