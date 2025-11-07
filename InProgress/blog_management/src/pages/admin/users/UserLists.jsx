import styles from './UserLists.module.css';

const UserLists = () => {
  return (
    <section className={styles.userContainWrap}>
      <div className={styles.containerMain}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>
            <i className="bi bi-people-fill" style={{color:"#2563eb"}}></i> User Management
          </h1>
        </div>

        <div className={styles.searchFilterSection}>
          <div className={styles.searchFilterTitle}>
            <i className="bi bi-search"></i> Search & Filter Users
          </div>
          <div className={styles.searchFilterWrapper}>
            <div className={styles.searchWrapper}>
              <i className={`bi bi-search ${styles.searchIcon}`}></i>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search by name or email..."
              />
            </div>
            <div className={styles.filterItem}>
              <label htmlFor="verifiedFilter">Email Status</label>
              <select id="verifiedFilter">
                <option value="">All</option>
                <option value="verified">Verified</option>
                <option value="not-verified">Not Verified</option>
              </select>
            </div>
            <div className={styles.filterItem}>
              <label htmlFor="blockedFilter">Account Status</label>
              <select id="blockedFilter">
                <option value="">All</option>
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <div className={styles.tableSection}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email Status</th>
                  <th>Account Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Sarah Johnson */}
                <tr>
                  <td>
                    <div className={styles.userInfoTable}>
                      <div
                        className={styles.userAvatarTable}
                        style={{ background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" }}
                      >
                        SJ
                      </div>
                      <div className={styles.userInfoContent}>
                        <div className={styles.userNameTable}>Sarah Johnson</div>
                        <div className={styles.userEmailTable}>sarah.johnson@example.com</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles.statusVerified}`}>
                      <i className={`bi bi-check-circle ${styles.iconSmall}`}></i> Verified
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles.statusActive}`}>
                      <i className={`bi bi-check-circle ${styles.iconSmall}`}></i> Active
                    </span>
                  </td>
                  <td>
                    <div className={styles.tableActions}>
                      <button className={`${styles.btnAction} ${styles.btnOtp}`} disabled>
                        <i className="bi bi-shield-check"></i> OTP
                      </button>
                      <button className={`${styles.btnAction} ${styles.btnBlock}`} disabled>
                        <i className="bi bi-lock"></i> Block
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Michael Chen */}
                <tr>
                  <td>
                    <div className={styles.userInfoTable}>
                      <div
                        className={styles.userAvatarTable}
                        style={{ background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" }}
                      >
                        MC
                      </div>
                      <div className={styles.userInfoContent}>
                        <div className={styles.userNameTable}>Michael Chen</div>
                        <div className={styles.userEmailTable}>michael.chen@example.com</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles.statusVerified}`}>
                      <i className={`bi bi-check-circle ${styles.iconSmall}`}></i> Verified
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles.statusActive}`}>
                      <i className={`bi bi-check-circle ${styles.iconSmall}`}></i> Active
                    </span>
                  </td>
                  <td>
                    <div className={styles.tableActions}>
                      <button className={`${styles.btnAction} ${styles.btnOtp}`} disabled>
                        <i className="bi bi-shield-check"></i> OTP
                      </button>
                      <button className={`${styles.btnAction} ${styles.btnBlock}`} disabled>
                        <i className="bi bi-lock"></i> Block
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Emma Davis */}
                <tr>
                  <td>
                    <div className={styles.userInfoTable}>
                      <div
                        className={styles.userAvatarTable}
                        style={{ background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" }}
                      >
                        ED
                      </div>
                      <div className={styles.userInfoContent}>
                        <div className={styles.userNameTable}>Emma Davis</div>
                        <div className={styles.userEmailTable}>emma.davis@example.com</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles.statusNotVerified}`}>
                      <i className={`bi bi-x-circle ${styles.iconSmall}`}></i> Not Verified
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles.statusActive}`}>
                      <i className={`bi bi-check-circle ${styles.iconSmall}`}></i> Active
                    </span>
                  </td>
                  <td>
                    <div className={styles.tableActions}>
                      <button className={`${styles.btnAction} ${styles.btnOtp}`} disabled>
                        <i className="bi bi-shield-check"></i> OTP
                      </button>
                      <button className={`${styles.btnAction} ${styles.btnBlock}`} disabled>
                        <i className="bi bi-lock"></i> Block
                      </button>
                    </div>
                  </td>
                </tr>

                {/* James Wilson */}
                <tr>
                  <td>
                    <div className={styles.userInfoTable}>
                      <div
                        className={styles.userAvatarTable}
                        style={{ background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" }}
                      >
                        JW
                      </div>
                      <div className={styles.userInfoContent}>
                        <div className={styles.userNameTable}>James Wilson</div>
                        <div className={styles.userEmailTable}>james.wilson@example.com</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles.statusVerified}`}>
                      <i className={`bi bi-check-circle ${styles.iconSmall}`}></i> Verified
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles.statusBlocked}`}>
                      <i className={`bi bi-lock ${styles.iconSmall}`}></i> Blocked
                    </span>
                  </td>
                  <td>
                    <div className={styles.tableActions}>
                      <button className={`${styles.btnAction} ${styles.btnOtp}`} disabled>
                        <i className="bi bi-shield-check"></i> OTP
                      </button>
                      <button className={`${styles.btnAction} ${styles.btnUnblock}`} disabled>
                        <i className="bi bi-unlock"></i> Unblock
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Olivia Martinez */}
                <tr>
                  <td>
                    <div className={styles.userInfoTable}>
                      <div
                        className={styles.userAvatarTable}
                        style={{ background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)" }}
                      >
                        OM
                      </div>
                      <div className={styles.userInfoContent}>
                        <div className={styles.userNameTable}>Olivia Martinez</div>
                        <div className={styles.userEmailTable}>olivia.martinez@example.com</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles.statusNotVerified}`}>
                      <i className={`bi bi-x-circle ${styles.iconSmall}`}></i> Not Verified
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles.statusActive}`}>
                      <i className={`bi bi-check-circle ${styles.iconSmall}`}></i> Active
                    </span>
                  </td>
                  <td>
                    <div className={styles.tableActions}>
                      <button className={`${styles.btnAction} ${styles.btnOtp}`} disabled>
                        <i className="bi bi-shield-check"></i> OTP
                      </button>
                      <button className={`${styles.btnAction} ${styles.btnBlock}`} disabled>
                        <i className="bi bi-lock"></i> Block
                      </button>
                    </div>
                  </td>
                </tr>

                {/* David Brown */}
                <tr>
                  <td>
                    <div className={styles.userInfoTable}>
                      <div
                        className={styles.userAvatarTable}
                        style={{ background: "linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)" }}
                      >
                        DB
                      </div>
                      <div className={styles.userInfoContent}>
                        <div className={styles.userNameTable}>David Brown</div>
                        <div className={styles.userEmailTable}>david.brown@example.com</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles.statusVerified}`}>
                      <i className={`bi bi-check-circle ${styles.iconSmall}`}></i> Verified
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles.statusActive}`}>
                      <i className={`bi bi-check-circle ${styles.iconSmall}`}></i> Active
                    </span>
                  </td>
                  <td>
                    <div className={styles.tableActions}>
                      <button className={`${styles.btnAction} ${styles.btnOtp}`} disabled>
                        <i className="bi bi-shield-check"></i> OTP
                      </button>
                      <button className={`${styles.btnAction} ${styles.btnBlock}`} disabled>
                        <i className="bi bi-lock"></i> Block
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Sophie Taylor */}
                <tr>
                  <td>
                    <div className={styles.userInfoTable}>
                      <div
                        className={styles.userAvatarTable}
                        style={{ background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)" }}
                      >
                        ST
                      </div>
                      <div className={styles.userInfoContent}>
                        <div className={styles.userNameTable}>Sophie Taylor</div>
                        <div className={styles.userEmailTable}>sophie.taylor@example.com</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles.statusNotVerified}`}>
                      <i className={`bi bi-x-circle ${styles.iconSmall}`}></i> Not Verified
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles.statusBlocked}`}>
                      <i className={`bi bi-lock ${styles.iconSmall}`}></i> Blocked
                    </span>
                  </td>
                  <td>
                    <div className={styles.tableActions}>
                      <button className={`${styles.btnAction} ${styles.btnOtp}`} disabled>
                        <i className="bi bi-shield-check"></i> OTP
                      </button>
                      <button className={`${styles.btnAction} ${styles.btnUnblock}`} disabled>
                        <i className="bi bi-unlock"></i> Unblock
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Alexander Lee */}
                <tr>
                  <td>
                    <div className={styles.userInfoTable}>
                      <div
                        className={styles.userAvatarTable}
                        style={{ background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)" }}
                      >
                        AL
                      </div>
                      <div className={styles.userInfoContent}>
                        <div className={styles.userNameTable}>Alexander Lee</div>
                        <div className={styles.userEmailTable}>alexander.lee@example.com</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles.statusVerified}`}>
                      <i className={`bi bi-check-circle ${styles.iconSmall}`}></i> Verified
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles.statusActive}`}>
                      <i className={`bi bi-check-circle ${styles.iconSmall}`}></i> Active
                    </span>
                  </td>
                  <td>
                    <div className={styles.tableActions}>
                      <button className={`${styles.btnAction} ${styles.btnOtp}`} disabled>
                        <i className="bi bi-shield-check"></i> OTP
                      </button>
                      <button className={`${styles.btnAction} ${styles.btnBlock}`} disabled>
                        <i className="bi bi-lock"></i> Block
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Section */}
        <div className={styles.paginationSection}>
          <div className={styles.paginationInfo}>
            <strong>Page 1 of 3</strong> — Showing 8 users of 24
          </div>
          <div className={styles.paginationButtons}>
            <button className={styles.paginationBtn} disabled>
              <i className="bi bi-chevron-left"></i> Previous
            </button>
            <button className={`${styles.paginationBtn} ${styles.active}`}>1</button>
            <button className={styles.paginationBtn}>2</button>
            <button className={styles.paginationBtn}>3</button>
            <button className={styles.paginationBtn}>
              Next <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserLists;
