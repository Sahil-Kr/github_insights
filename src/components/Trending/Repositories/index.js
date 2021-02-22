import React, { useEffect, useState } from "react";
import Loader from "../../Loader";
import Repository from "./Repository";

const Repositories = () => {
  const [trendingData, setTrendingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // console.log("fetching repo data");
    const header = {
      method: "GET",
      headers: new Headers({
        "x-rapidapi-key": "00765a266cmsh06a30372c102f5bp1b6638jsn52a6baf9d86b",
        "x-rapidapi-host": "github-trending.p.rapidapi.com",
        useQueryString: "true",
      }),
    };

    const res = await fetch(
      "https://github-trending.p.rapidapi.com/repositories?since=daily&spoken_language_code=en",
      header
    );

    const data = await res.json();
    // console.log(data);

    setTrendingData(data);
    setLoading(false);
  };

  return (
    <div>
      {!loading ? (
        trendingData.map((data, index) => {
          const key = ("" + Math.random() * (index + 1)).split(".")[1];
          return <Repository key={key} repo={data} />;
        })
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Repositories;
