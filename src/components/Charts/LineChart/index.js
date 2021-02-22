import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Loader from "../../Loader";
import classes from "./index.module.css";

const LineChart = ({ graphData }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log(graphData, loading);
    if (graphData?.datasets?.length > 0) setLoading(false);
  }, [graphData]);

  return (
    <>
      <div className={classes.LineChart}>
        {loading ? (
          <div className={classes.Loader}>
            <Loader />
          </div>
        ) : (
          ""
        )}
        <Line
          data={graphData}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            title: {
              display: false,
            },
            legend: {
              display: false,
            },
            hover: {
              mode: "nearest",
              intersect: false,
              axis: "xy",
            },
            scales: {
              yAxes: [
                {
                  position: "right",
                  gridLines: {
                    display: true,
                    color: "rgba(255, 255, 255, 0.2)",
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                  display: true,
                  ticks: {
                    display: false,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </>
  );
};

export default LineChart;
