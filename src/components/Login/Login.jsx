import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/Context";
import Cookies from "js-cookie";

function Login() {
    const { setShowNavMenu, setUserID } =
    useContext(Context);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setLoginData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/user/login",
        loginData,
        { withCredentials: true }
      );
    //   console.log(response.data);
      Cookies.set("userID", response.data.user._id, { expires: 7, secure: true });
      setUserID(response.data.user._id);
      setShowNavMenu(true);
      navigate("/user/profile");
    } catch (error) {
      setError(error.response ? error.response.data.error : error.message);
      setLoading(false)
      navigate("/user/login");
    }

    setLoginData({
      username: "",
      password: "",
    });
  }

  return (
    <main className={style.container}>
      <div>
        <h1>Login Now</h1>
      </div>
      <div className={style.cardContainer}>
        <div className={style.inputContainer} style={{ marginTop: "90px" }}>
          <input
            value={loginData.username}
            type="text"
            name="username"
            id="username"
            placeholder="enter your email/username"
            onChange={handleChange}
          />
        </div>
        <div className={style.inputContainer}>
          <input
            value={loginData.password}
            type="password"
            name="password"
            id="password"
            placeholder="enter your password"
            onChange={handleChange}
          />
        </div>
        <div className={style.submitBtn} onClick={handleSubmit}>
          <button type="submit">{!loading ? "Login" : "Submitting..."}</button>
        </div>

        {error ? error : ""}
      </div>
    </main>
  );
}

export default Login;
