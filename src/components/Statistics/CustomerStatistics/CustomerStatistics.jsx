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
          (record, index) => "#bcd040" + Math.floor(255 * (20-index)/24).toString(16)
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
