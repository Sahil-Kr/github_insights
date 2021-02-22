import React, { useEffect, useState } from "react";
import Loader from "../../Loader";
import Developer from "./Developer";

const Developers = () => {
  const [developersData, setDevelopersData] = useState([]);
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
      "https://github-trending.p.rapidapi.com/developers?since=daily",
      header
    );

    const data = await res.json();
    // console.log(data);

    setDevelopersData(data);
    setLoading(false);
  };

  return (
    <div>
      {!loading ? (
        developersData.map((data, index) => {
          const key = ("" + Math.random() * (index + 1)).split(".")[1];
          return <Developer key={key} dev={data} index={index + 1} />;
        })
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Developers;
