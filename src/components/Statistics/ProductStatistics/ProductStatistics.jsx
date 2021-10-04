import styles from "./ProductStatistics.module.scss";

import { useState, useEffect } from "react";

import { ReporteService } from "../../../services/ReporteService";

import { Chart } from "primereact/chart";
import { ReportExporter } from "../../ReportExporter/ReportExporter";

export function ProductStatistics() {
  const [data, setData] = useState([]);

  const cols = [
    { field: "id", header: "Id" },
    { field: "nombre", header: "Producto" },
    { field: "cantidad", header: "Ventas totales" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await ReporteService.reporteProductos();
      setData(response);
    };
    fetchData();
  }, []);

  const truncateData = data.length > 11 ? data.slice(0, 10) : data;

  const chartData = {
    labels: truncateData.map((record) => record.nombre),
    datasets: [
      {
        label: "Productos más vendidos",
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
    <div className={styles.productStatistics}>
      <Chart type="bar" data={chartData} options={chartOptions} />
      <div className={styles.buttonContainer}>
        <ReportExporter
          label="Exportar reporte de productos"
          cols={cols}
          filename="Reporte_productos"
          data={data}
          className="btn btn-azulClaro"
        />
      </div>
    </div>
  );
}
