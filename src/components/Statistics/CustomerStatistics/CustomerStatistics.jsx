import styles from "./CustomerStatistics.module.scss";

import { useState, useEffect } from "react";

import { ReporteService } from "../../../services/ReporteService";

import { Chart } from "primereact/chart";
import { ReportExporter } from "../../ReportExporter/ReportExporter";

export function CustomerStatistics() {
  const [data, setData] = useState([]);

  const cols = [
    { field: "id", header: "Id" },
    { field: "nombre", header: "Cliente" },
    { field: "total", header: "Total compras" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await ReporteService.reporteClientes();
      setData(response);
    };
    fetchData();
  }, []);

  const truncateData = data.length > 11 ? data.slice(0, 10) : data;

  const chartData = {
    labels: truncateData.map((record) => record.nombre),
    datasets: [
      {
        label: "Clientes que generan más ganancias",
        backgroundColor: truncateData.map(
          (record) => "#bcd040" + Math.floor(Math.random() * (256 - 64) + 64).toString(16)  // + Math.floor(Math.random() * 16777215).toString(16)
        ),
        data: truncateData.map((record) => record.total),
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
    <div className={styles.customerStatistics}>
      <Chart type="bar" data={chartData} options={chartOptions} />
      <div className={styles.buttonContainer}>
        <ReportExporter
          label="Exportar reporte de clientes"
          cols={cols}
          filename="Reporte_clientes"
          data={data}
          className="btn btn-azulClaro"
        />
      </div>
    </div>
  );
}
