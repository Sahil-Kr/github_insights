import classes from "./index.module.css";
import React, { useEffect, useState } from "react";
import LineChart from "../../../../Charts/LineChart";
import { getDuration, UrlLauncher } from "../../../../Utilities";
import BarChart from "../../../../Charts/BarChart";
import expand from "../../../../../Assets/Icons/expand.svg";

const RepoDetails = ({ repo, clickHandler, commitData }) => {
  const [lineChartData, setLineChartData] = useState({});
  const [barChartData, setBarChartData] = useState({});
  const [commitDetails, setCommitDetails] = useState({});
  useEffect(() => {
    fetchLanguageData();
    fetchCommitDetails();
    lineChartDataSetter();
  }, []);

  const lineChartDataSetter = () => {
    const preparedData = {};

    commitData.forEach((data) => {
      const month = ("" + new Date(+data.week * 1000)).split(" ");
      if (`${month[1] + " " + month[3]}` in preparedData) {
        preparedData[`${month[1] + " " + month[3]}`] =
          preparedData[`${month[1] + " " + month[3]}`] + data.total;
      } else preparedData[`${month[1] + " " + month[3]}`] = data.total;

      // console.log(data.total, month[1] + " " + month[3]);
    });

    const graph = {
      labels: [...Object.keys(preparedData).map((date) => date)],
      datasets: [
        {
          label: "Commits",
          fill: true,
          lineTension: 0.5,
          backgroundColor: "rgba(240,136,62,1)",
          borderColor: "rgba(255,255,255,1)",
          borderWidth: 1,
          data: [...Object.values(preparedData)],
        },
      ],
    };

    // console.log(preparedData);
    setLineChartData(graph);
  };

  const fetchCommitDetails = async () => {
    const [data] = await fetch(
      `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?page=1&per_page=1`
    ).then((res) => res.json());

    // console.log(data);
    const filteredData = {
      sha: data.sha,
      author: data.commit.author,
      message: data.commit.message,
      url: data.html_url,
      username: data.author.login,
      avatar_url: data.author.avatar_url,
      author_url: data.author.html_url,
    };

    // console.log(filteredData);
    setCommitDetails(filteredData);
  };

  const fetchLanguageData = async () => {
    // console.log("GET --> Language data");
    const data = await fetch(
      `https://api.github.com/repos/${repo.owner.login}/${repo.name}/languages`
    ).then((res) => res.json());

    // console.log("<-- Language data", data);
    barChartDataSetter(data);
  };

  const barChartDataSetter = (data) => {
    const backgroundColors = [
      "#da3633",
      "#f0883e",
      "#0366d6",
      "#129b89",
      "#8c3c81",
      "#da3633",
      "#f0883e",
      "#0366d6",
      "#129b89",
      "#8c3c81",
    ];

    const hoverBackgroubdColors = [
      "#ad0603",
      "#d35c0c",
      "#0808ce",
      "#027263",
      "#6b185e",
      "#ad0603",
      "#d35c0c",
      "#0808ce",
      "#027263",
      "#6b185e",
    ];

    let total = Object.values(data).reduce((acc, value) => acc + value);

    const chartData = {
      labels: [...Object.keys(data)],
      datasets: [
        {
          backgroundColor: backgroundColors,
          hoverBackgroundColor: hoverBackgroubdColors,
          borderColor: "#eee",
          borderWidth: 1,
          maxBarThickness: 50,
          minBarLength: 10,
          barThickness: "flex",
          data: [...Object.values(data)].map((value) =>
            ((value * 100) / total).toFixed(2)
          ),
        },
      ],
    };

    setBarChartData(chartData);
  };

  // console.log(repo.created_at);
  return (
    <>
      <div className={classes.Modal} onClick={clickHandler}></div>
      <div className={classes.RepoDetails}>
        <div className={classes.Title}>
          {repo.name}
          <UrlLauncher url={repo.html_url}>
            <img src={expand} alt="send icon" />
          </UrlLauncher>
        </div>

        <div className={classes.LineChartCont}>
          <LineChart graphData={lineChartData} />
        </div>
        <div className={classes.DetailCont}>
          <div className={classes.Info}>
            <p>
              Repo Created:-{" "}
              <span className={classes.LightText}>
                {getDuration(repo.created_at)} ago
              </span>{" "}
            </p>
            <p>
              Last updated:-{" "}
              <span className={classes.LightText}>
                {getDuration(repo.updated_at)} ago
              </span>
            </p>
            <div className={classes.Divider} />
            {Object.keys(commitDetails).length > 0 ? (
              <div>
                <p>
                  Last Commit:-{" "}
                  <UrlLauncher url={commitDetails.url}>
                    <div className={classes.Link}>{commitDetails.message}</div>
                  </UrlLauncher>
                </p>
                <span className={classes.ContentSize}>
                  Commited {getDuration(commitDetails.author.date)} ago
                </span>
                <p>
                  Commited by:- <span>{commitDetails.author.name}</span>
                  <UrlLauncher url={commitDetails.author_url}>
                    <p className={classes.Link}>({commitDetails.username})</p>
                  </UrlLauncher>
                </p>
                <div
                  className={classes.UserImage}
                  style={{
                    backgroundImage: `url('${commitDetails.avatar_url}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </div>
            ) : null}
          </div>
          <div className={classes.BarChart}>
            <p>Languages usage %</p>
            <BarChart chartData={barChartData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RepoDetails;
