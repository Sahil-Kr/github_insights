import React, { useEffect, useState } from "react";

import classes from "./index.module.css";
import LineChart from "../Charts/LineChart";
import UserInfo from "./UserInfo";
import DoughnutChart from "../Charts/DoughnutChart";
import UserRepos from "./UserRepos";

const UserDetails = ({ match }) => {
  const [graphData, setGraphData] = useState({});
  const [starsData, setStarsData] = useState({});
  const [languageData, setLanguageData] = useState({});
  const [repoData, setRepoData] = useState([]);
  const [repoCommitData, setRepoCommitData] = useState([]);
  const username = match.params.username;

  useEffect(() => {
    calculateCommits();
  }, []);

  const calculateCommits = async () => {
    const repos = [];

    const data = await fetch(
      `https://api.github.com/users/${username}/repos?page=1&per_page=100`
    ).then((res) => {
      const resJson = res.json();
      if (!res.ok || res.status != 200) {
        return [];
      }
      return resJson;
    });

    // const data = await res.json();
    if (!data || data.length === 0) return;
    setRepoData(data);
    // console.log(data);

    const stars = {};
    const watchers = {};
    const languages = {};
    data.forEach((repo) => {
      stars[repo.name] = repo.stargazers_count;
      watchers[repo.name] = repo.watchers_count;
      if (repo.language && `${repo.language}` in languages) {
        languages[`${repo.language}`] = languages[`${repo.language}`] + 1;
      } else if (repo.language) {
        languages[`${repo.language}`] = 1;
      }
      repos.push(repo.name);
    });

    setStarsData(graphDataSetter(stars));
    setLanguageData(graphDataSetter(languages));

    const weeklyCommitsobj = {};
    const repoCommits = [];

    for (let i = 0; i < repos.length; i++) {
      const resp = await fetch(
        `https://api.github.com/repos/${username}/${repos[i]}/stats/commit_activity`
      ).then((res) => {
        // console.log(res);
        return res.json();
      });

      repoCommits.push(resp);

      for (let j = 0; j < 52; j++) {
        const month = ("" + new Date(+resp[j]?.week * 1000)).split(" ");

        if (`${month[1] + " " + month[3]}` in weeklyCommitsobj) {
          weeklyCommitsobj[`${month[1] + " " + month[3]}`] =
            weeklyCommitsobj[`${month[1] + " " + month[3]}`] + resp[j].total;
        } else weeklyCommitsobj[`${month[1] + " " + month[3]}`] = resp[j].total;
      }
    }

    setRepoCommitData(repoCommits);
    // console.log("Repo commits", repoCommits);
    // console.log(repos);

    setLineChartData(weeklyCommitsobj);
    console.log("fetch complete");
  };

  const setLineChartData = (weeklyCommitsobj) => {
    const graph = {
      labels: [...Object.keys(weeklyCommitsobj).map((date) => date)],
      datasets: [
        {
          label: "Commits",
          fill: true,
          lineTension: 0.5,
          backgroundColor: "rgba(240,136,62,1)",
          borderColor: "rgba(255,255,255,1)",
          borderWidth: 1,
          data: [...Object.values(weeklyCommitsobj)],
        },
      ],
    };

    setGraphData(graph);
  };

  // const fetchLanguageData = async (repos) => {
  //   console.log("fetching lang data");
  //   if (repos.label > 50) return;

  //   const languages = {};

  //   for (let repo of repos) {
  //     const res = await fetch(
  //       `https://api.github.com/repos/${username}/${repo}/languages`
  //     ).then((resp) => {
  //       // console.log(res);
  //       return resp.json();
  //     });

  //     for (let lang in res) {
  //       // languages[`${lang}`] = languages[`${lang}`] ?? 0 + 1;
  //       if (`${lang}` in languages) {
  //         languages[`${lang}`] = languages[`${lang}`] + 1;
  //       } else {
  //         languages[`${lang}`] = 1;
  //       }
  //     }
  //   }

  //   // console.log("languages", languages);
  //   setLanguageData(graphDataSetter(languages));
  //   console.log("fetching lang data complete");

  //   return languages;
  // };

  // const setDoughnutData = (starsData) => {
  //   setStarsData(graphDataSetter(starsData));
  // };

  // const setWatchersRepoData = (starsData) => {
  //   setStarsData(graphDataSetter(starsData));
  // };

  const graphDataSetter = (chartData) => {
    // console.log("chart data", chartData);
    const labels = [];
    const datasets = [];
    const backgroundColors = [
      "#da3633",
      "#f0883e",
      "#129b89",
      "#8c3c81",
      "#0366d6",
    ];

    const hoverBackgroubdColors = [
      "#ad0603",
      "#d35c0c",
      "#027263",
      "#6b185e",
      "#0808ce",
    ];

    let colorIdx = 0;
    for (let d in chartData) {
      if (colorIdx > 4) {
        backgroundColors.push(backgroundColors[colorIdx % 5]);
        hoverBackgroubdColors.push(hoverBackgroubdColors[colorIdx % 5]);
      }

      if (chartData[d] > 0) {
        labels.push(d);
        datasets.push(chartData[d]);
        colorIdx++;
      }
    }

    // console.log(colorIdx);

    const data = {
      labels: labels,
      datasets: [
        {
          label: "Repos",
          borderWidth: 0.5,
          backgroundColor: backgroundColors,
          hoverBackgroundColor: hoverBackgroubdColors,
          data: datasets,
        },
      ],
    };

    // console.log("graph data", data);
    return data;
  };

  return (
    <div className={classes.Container}>
      <div className={classes.UserMain}>
        <UserInfo username={username} />
        <LineChart graphData={graphData} />
      </div>
      <div className={classes.Divider} />
      <div
        className={classes.DoughnutBody}
        style={{
          flexFlow:
            starsData?.labels?.length > 15 || languageData?.labels?.length > 15
              ? "column"
              : "row",
        }}
      >
        <div
          className={classes.Doughnuts}
          style={{
            marginBottom:
              starsData?.labels?.length > 15 ||
              languageData?.labels?.length > 15
                ? "1rem"
                : "0",
            marginRight:
              starsData?.labels?.length < 15 &&
              languageData?.labels?.length < 15
                ? "1rem"
                : "0",
          }}
        >
          <span>Stars per Repo</span>
          <DoughnutChart chartData={starsData} />
        </div>
        <div className={classes.Doughnuts}>
          <span>Repos per Language</span>
          <DoughnutChart chartData={languageData} />
        </div>
      </div>
      <div className={classes.Divider} />
      <UserRepos userRepos={repoData} commitData={repoCommitData} />
    </div>
  );
};

export default UserDetails;
