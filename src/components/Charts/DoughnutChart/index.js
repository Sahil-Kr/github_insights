import classes from "./index.module.css";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import Loader from "../../Loader";

const DoughnutChart = ({ chartData }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log(chartData, loading);
    if (chartData?.datasets?.length > 0) setLoading(false);

    return () => setLoading(true);
  }, [chartData]);

  return (
    <div className={classes.Doughnut}>
      {loading ? (
        <div className={classes.Loader}>
          <Loader />
        </div>
      ) : (
        ""
      )}
      <Doughnut
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: false,
          },
          legend: {
            display: true,
            position: "left",
          },
        }}
      />
    </div>
  );
};

export default DoughnutChart;
