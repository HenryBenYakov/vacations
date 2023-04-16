import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { MVacation } from "../../../models/vacation";
import { notifyService } from "../../../services/notify-service";
import { vacationsService } from "../../../services/vacations-service";
import { Container } from "@mui/material";
import "./chart.style.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const Chart: React.FC = () => {
  const [vacations, setVacations] = useState<MVacation[]>([]);

  useEffect(() => {
    vacationsService
      .getAllVacations()
      .then((vacations) =>
        setVacations(
          vacations.filter((v) => {
            return v.followersCount > 0;
          })
        )
      )
      .catch((err) => notifyService.error(err));
  }, []);

  const labels = vacations.map((v) => v.destination);
  const data1 = vacations.map((v) => v.followersCount);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Vacation",
        data: data1,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="Chart-Background">
      <Container className="Chart">
        <Bar options={options} data={data} />
      </Container>
    </div>
  );
};
