//import styles from "./ReportExporter.module.scss";

export function ReportExporter({
  label,
  className = "",
  cols,
  filename,
  data,
}) {
  const exportColumns = cols.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(exportColumns, data);
        doc.save(filename + ".pdf");
      });
    });
  };

  return (
    <button onClick={() => exportPdf()} className={className}>
      {label}
    </button>
  );
}
