import styles from "./CategoryStatistics.module.scss";

import { useState, useEffect } from "react";

import { ReporteService } from "../../../services/ReporteService";

import { Chart } from "primereact/chart";
import { ReportExporter } from "../../ReportExporter/ReportExporter";

export function CategoryStatistics() {
  const [data, setData] = useState([]);

  const cols = [
    { field: "id", header: "Id" },
    { field: "categoria", header: "Categoria" },
    { field: "cantidad", header: "Ventas totales" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await ReporteService.reporteCategorias();
      setData(response);
    };
    fetchData();
  }, []);

  const truncateData = data.length > 11 ? data.slice(0, 10) : data;

  const chartData = {
    labels: truncateData.map((record) => record.categoria),
    datasets: [
      {
        label: "Categorías más vendidos",
        backgroundColor: truncateData.map(
          (record) => "#" + Math.floor(Math.random() * 16777215).toString(16)
        ),
        data: truncateData.map((record) => record.cantidad),
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
      },
      y: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
      },
    },
  };

  return (
    <div className={styles.categoryStatistics}>
      <Chart type="bar" data={chartData} options={chartOptions} />
      <div className={styles.buttonContainer}>
        <ReportExporter
          label="Exportar reporte de categorías"
          cols={cols}
          filename="Reporte_categorias"
          data={data}
          className="btn btn-azulClaro"
        />
      </div>
    </div>
  );
}
