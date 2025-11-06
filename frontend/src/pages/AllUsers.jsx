import React, { useEffect, useState } from "react";
import apiSummary from "../../common";

const AllUsers = () => {
  const [alluser, setAlluser] = useState([]);

  //fetch all users
  const fetchAllUsers = async () => {
    const fetchData = await fetch(apiSummary.allUser.url, {
      method: apiSummary.allUser.method,
      credentials: "include",
    });
    
    const dataResponce = await fetchData.json();
    console.log("alluser", dataResponce);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);
  return <div>AllUsers</div>;
};

export default AllUsers;
