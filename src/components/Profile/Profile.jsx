import React, { useEffect, useState } from "react";
import style from "./Profile.module.css";
import axios from "axios";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/user/profile", {
          withCredentials: true,
        });
        setUserData(response.data.userInfo);
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className={style.error}>{error}</p>;
  }

  if (!userData) {
    return <p>No user data available</p>;
  }

  return (
    <main className={style.container}>
      <div className={style.cardContainer}>
        <div className={style.imgContainer}>
          {userData.profilePic && <img src={userData.profilePic} alt="Profile" />}
        </div>
        <div className={style.detailsContainer}>
          <h2>Name:- {userData.fullname}</h2>
          <p>Email:- {userData.email}</p>
          <p>Username:-  {userData.username}</p>
          <p>Account Created At :- {userData.createdAt}</p>
        </div>
      </div>
    </main>
  );
}

export default Profile;
