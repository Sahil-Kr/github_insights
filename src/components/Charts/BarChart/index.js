import classes from "./index.module.css";
import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ chartData }) => {
  return (
    <div className={classes.BarChart}>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
            // position: "bottom",
          },
          scales: {
            yAxes: [
              {
                position: "right",
                gridLines: {
                  display: true,
                  color: "rgba(255, 255, 255, 0.2)",
                },
                ticks: {
                  min: 0,
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  display: true,
                },
                position: "bottom",
                display: true,
                ticks: {
                  display: true,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default BarChart;
