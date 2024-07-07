import React, { useContext, useState } from "react";
import style from "./NavBar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";

function NavBar() {
  const { userID, showNavMenu, setShowNavMenu, setUserID } =
    useContext(Context);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  async function handleLogout() {
    try {
      const response = await axios.get("http://localhost:3000/user/logout", {
        withCredentials: true,
      });
      setUserID("");
      setShowNavMenu(false);
      navigate("/");
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  }

  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <div className={style.logoContainer}>
          <h1 style={{ fontSize: "2.1rem" }}>Priyesh</h1>
        </div>

        <div className={style.linkContainer}>
          <div>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${style.links} ${isActive && style.active}`
              }
            >
              Home
            </NavLink>
          </div>
          {!showNavMenu ? 
          <>
          
          <div>
            <NavLink
              to="user/register"
              className={({ isActive }) =>
                `${style.links} ${isActive && style.active}`
              }
            >
              Register
            </NavLink>
          </div>
          <div>
            <NavLink
              to="user/login"
              className={({ isActive }) =>
                `${style.links} ${isActive && style.active}`
              }
            >
              Login
            </NavLink>
          </div>
          </>:
          <div>
            <NavLink
              to="user/profile"
              className={({ isActive }) =>
                `${style.links} ${isActive && style.active}`
              }
            >
              View-profile
            </NavLink>
          </div>}
        </div>

        <div className={style.logOutBtn} onClick={handleLogout}>
        {showNavMenu &&<button> Logout</button>}
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
