import "./AppNavbar.css";
import { NavLink, Link } from "react-router";
import { useState } from "react";
import { getItem, removeToken } from "../utils/session";

const AppNavbar = () => {
 
  // Initialize variables
  let name = null;
  let email = null;

  const storedUser = getItem("currentUser");

  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      name = parsedUser.name || null;
      email = parsedUser.email || null;
      console.log("User info:", { name, email });
    } catch (error) {
      console.error("Failed to parse user info:", error);
    }
  }

  // Use state to track login info
  const [userLoggedInfo, setUserLoggedInfo] = useState(name);
 

  const logOut = () => {
    removeToken();           // clear session
    setUserLoggedInfo(null);   // update state → triggers re-render
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom sticky-top">
      <div className="container-fluid px-4 custom-container">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-pencil-square"></i> BlogHub
        </Link> 
        { userLoggedInfo &&
        <sub  className="welcome-message" style={{ 
        fontSize: "16px", 
        color: "gold", 
        fontStyle: "italic", 
        fontWeight: "500" 
      }}>
        Welcome <span style={{ color: "white" }}>{userLoggedInfo['name']}{userLoggedInfo}</span>
        </sub>
       }

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                <i className="bi bi-house"></i> Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/blogs"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                <i className="bi bi-newspaper"></i> Blogs
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                <i className="bi bi-info-circle"></i> About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                <i className="bi bi-envelope"></i> Contact
              </NavLink>
            </li>

            {userLoggedInfo && (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/profile"
                      className={({ isActive }) =>
                        isActive ? "nav-link active-link" : "nav-link"
                      }
                    >
                      <i className="bi bi-person-circle"></i> Profile
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to="/create-posts"
                      className={({ isActive }) =>
                        isActive ? "nav-link active-link" : "nav-link"
                      }
                    >
                      <i className="bi bi-pencil-square"></i> Create Post
                    </NavLink>
                  </li>
                </>
              )}

            <li className="nav-item ms-2">
              {userLoggedInfo ? (
                <Link style={{ textDecoration: "none" }} to="/">
                <button className="btn-login" onClick={logOut}>
                  <i className="bi bi-box-arrow-right"></i> Logout
                </button>
                </Link>
              ) : (
                <Link style={{ textDecoration: "none" }} to="/auth/login">
                  <button className="btn-login">
                    <i className="bi bi-box-arrow-in-right"></i> Login
                  </button>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
