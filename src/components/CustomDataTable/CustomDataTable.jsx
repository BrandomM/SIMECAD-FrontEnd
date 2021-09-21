// import "primereact/resources/primereact.min.css";
import styles from "./CustomDataTable.module.css";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { forwardRef } from "react";

import { DataTable } from "primereact/datatable";
import { Ripple } from "primereact/ripple";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
// import { Column } from "primereact/column";

export const CustomDataTable = forwardRef(
  ({ value, loading = false, dt, cols, filename, children }, ref) => {
    const { t } = useTranslation();
    // const T = (key) => t("dataTable.");

    const [currentPage, setCurrentPage] = useState(1);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [pageInputTooltip, setPageInputTooltip] = useState(
      "Press 'Enter' key to go to this page."
    );

    const onCustomPage = (event) => {
      setFirst(event.first);
      setRows(event.rows);
      setCurrentPage(event.page + 1);
    };

    const onPageInputKeyDown = (event, options) => {
      if (event.key === "Enter") {
        const page = parseInt(currentPage);
        if (page < 0 || page > options.totalPages) {
          setPageInputTooltip(
            `Value must be between 1 and ${options.totalPages}.`
          );
        } else {
          const first = currentPage ? options.rows * (page - 1) : 0;

          setFirst(first);
          setPageInputTooltip("Press 'Enter' key to go to this page.");
        }
      }
    };

    const onPageInputChange = (event) => {
      setCurrentPage(event.target.value);
    };

    const template = {
      layout:
        "PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport",
      PrevPageLink: (options) => {
        return (
          <button
            type="button"
            className={options.className}
            onClick={options.onClick}
            disabled={options.disabled}
          >
            <span className="p-p-3">Previous</span>
            <Ripple />
          </button>
        );
      },
      NextPageLink: (options) => {
        return (
          <button
            type="button"
            className={options.className}
            onClick={options.onClick}
            disabled={options.disabled}
          >
            <span className="p-p-3">Next</span>
            <Ripple />
          </button>
        );
      },
      PageLinks: (options) => {
        if (
          (options.view.startPage === options.page &&
            options.view.startPage !== 0) ||
          (options.view.endPage === options.page &&
            options.page + 1 !== options.totalPages)
        ) {
          const className = classNames(options.className, {
            "p-disabled": true,
          });

          return (
            <span className={className} style={{ userSelect: "none" }}>
              ...
            </span>
          );
        }

        return (
          <button
            type="button"
            className={options.className}
            onClick={options.onClick}
          >
            {options.page + 1}
            <Ripple />
          </button>
        );
      },
      RowsPerPageDropdown: (options) => {
        const dropdownOptions = [
          { label: 10, value: 10 },
          { label: 20, value: 20 },
          { label: 50, value: 50 },
          { label: "All", value: options.totalRecords },
        ];

        return (
          <Dropdown
            value={options.value}
            options={dropdownOptions}
            onChange={options.onChange}
            appendTo={document.body}
          />
        );
      },
      CurrentPageReport: (options) => {
        return (
          <span
            className="p-mx-3"
            style={{ color: "var(--text-color)", userSelect: "none" }}
          >
            Go to{" "}
            <InputText
              size="2"
              className="p-ml-1"
              value={currentPage}
              tooltip={pageInputTooltip}
              onKeyDown={(e) => onPageInputKeyDown(e, options)}
              onChange={onPageInputChange}
            />
          </span>
        );
      },
    };

    const exportCSV = (selectionOnly) => {
      dt.current.exportCSV({ selectionOnly });
    };

    const exportExcel = () => {
      import("xlsx").then((xlsx) => {
        const worksheet = xlsx.utils.json_to_sheet(value);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
        const excelBuffer = xlsx.write(workbook, {
          bookType: "xlsx",
          type: "array",
        });
        saveAsExcelFile(excelBuffer, filename);
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

    const exportColumns = cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));

    const exportPdf = () => {
      import("jspdf").then((jsPDF) => {
        import("jspdf-autotable").then(() => {
          const doc = new jsPDF.default(0, 0);
          doc.autoTable(exportColumns, value);
          doc.save(filename+".pdf");
        });
      });
    };

    return (
      <>
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
        <div className={`${styles["datatable-responsive-demo"]}`}>
          <div className={`${styles.roca} card roca`}>
            <DataTable
              value={value}
              paginator
              paginatorTemplate={template}
              first={first}
              rows={rows}
              onPage={onCustomPage}
              className="p-datatable-responsive-demo"
              loading={loading}
              ref={ref}
            >
              {children}
            </DataTable>
          </div>
        </div>
      </>
    );
  }
);
