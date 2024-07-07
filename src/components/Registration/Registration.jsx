import React, { useState } from "react";
import style from "./Registration.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registration() {
  const [userData, setUserData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
  });
  const [profilePic, setProfilePic] = useState(null);
  const [error,setError] = useState(null)
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target;
    setUserData((preValue) => ({
      ...preValue,
      [name]: value,
    }));
  }

  function handleFileChange(event) {
    setProfilePic(event.target.files[0]);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setLoading(true)

    const formData = new FormData();
    formData.append("username", userData.username);
    formData.append("fullname", userData.fullname);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    if (profilePic) {
      formData.append("profilePic", profilePic);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/user/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Form submitted successfully:", response.data);

      setUserData({
        username: "",
        fullname: "",
        email: "",
        password: "",
      });
      setLoading(false)
      setProfilePic(null);
      navigate("/user/login");
    } catch (error) {
      setLoading(false)
      setError(error.response ? error.response.data.error : error.message);
      console.error("Error submitting form:", error);
      navigate("/user/register");
    }
  }

  return (
    <main className={style.container}>
      <div>
        <h1>Register Now</h1>
      </div>
 
      <div className={style.cardContainer}>
        <div className={style.inCon}>
          <div className={style.first}>
            <input
              value={userData.fullname}
              type="text"
              name="fullname"
              id="fullname"
              placeholder="Your Full Name"
              onChange={handleChange}
            />
          </div>
          <div className={style.second}>
            <input
              value={userData.username}
              type="text"
              name="username"
              id="username"
              placeholder="Your username"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={style.inputContainer}>
          <input
            value={userData.email}
            type="email"
            name="email"
            id="email"
            placeholder="enter your email"
            onChange={handleChange}
          />
        </div>
        <div className={style.inputContainer}>
          <input
            value={userData.password}
            type="password"
            name="password"
            id="password"
            placeholder="enter your password"
            onChange={handleChange}
          />
        </div>
        <div className={style.inputContainer}>
          <input
            type="file"
            name="profilePic"
            id="profilePic"
            onChange={handleFileChange}
          />
        </div>
        <div className={style.submitBtn} onClick={handleSubmit}>
          <button type="submit"> {!loading ? "Create Account" : "Submitting..." } </button>
        </div>
        <div>
        {error? error : ""}
        </div>
      </div>
    </main>
  );
}

export default Registration;
