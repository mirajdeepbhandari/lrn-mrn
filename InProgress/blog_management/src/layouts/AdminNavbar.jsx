import { NavLink, useNavigate } from "react-router";
import styles from "./AdminNavbar.module.css";
import { removeToken, getItem } from "../utils/session";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const user_info = getItem("currentUser");
  const {name:current_user_name} = JSON.parse(user_info);

  const logOut = (e) => {
    e.preventDefault();
    removeToken();
    navigate("/");
  };

  return (
    <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
      <div className="container-fluid px-4">

        <NavLink className={`navbar-brand ${styles.navbarBrand}`} to="/admin">
          <i className="bi bi-pencil-square"></i> BlogHub
        </NavLink>

        <sub
          className="welcome-message"
          style={{
            fontSize: "16px",
            color: "gold",
            fontStyle: "italic",
            fontWeight: "500",
          }}
        >
          Welcome <span style={{ color: "white" }}>{current_user_name}</span>
        </sub>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${styles.navbarCollapse}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto gap-3">

            {/* Important → added `end` here */}
            <li className="nav-item">
              <NavLink
                to="/admin"
                end // {need to add end here as its the parent path so active will always come here if not added}
                className={({ isActive }) =>
                  `nav-link ${styles.navLink} ${isActive ? styles.active : ""}`
                }
              >
                <i className="bi bi-file-text me-2"></i>Manage Blogs
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `nav-link ${styles.navLink} ${isActive ? styles.active : ""}`
                }
              >
                <i className="bi bi-people me-2"></i>Manage Users
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/admin/profile"
                className={({ isActive }) =>
                  `nav-link ${styles.navLink} ${isActive ? styles.active : ""}`
                }
              >
                <i className="bi bi-person-circle me-2"></i>Profile
              </NavLink>
            </li>

            <li className="nav-item">
              <button
                onClick={logOut}
                className={styles.logoutBtn}
              >
                <i className="bi bi-box-arrow-right me-2"></i>Logout
              </button>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
