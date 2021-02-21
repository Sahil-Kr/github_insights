import React, { useEffect, useState } from "react";

const Trending = () => {
  const [trendingData, setTrendingData] = useState([]);
  const [isRepo, setIsRepo] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
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
    console.log(data);

    setTrendingData(data);
  };

  return <div></div>;
};

export default Trending;
