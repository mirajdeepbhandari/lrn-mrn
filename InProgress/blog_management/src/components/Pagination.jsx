import React from "react";

const Pagination = ({ page, setPage, total_data_items, limit = 6 }) => {
  const total_possible_pages = Math.ceil(total_data_items / limit);
  const visiblePages = 6; // number of pages to show in the window[1...2,3,4,5,6,7...,n] (2,3,4,5,6,7) is visiblepage

  const getPageNumbers = () => {
    if (total_possible_pages <= visiblePages + 2) {
      return Array.from({ length: total_possible_pages }, (_, i) => i + 1);
    }

    let start = page - Math.floor(visiblePages / 2);
    let end = page + Math.floor(visiblePages / 2);  

    if (start < 2) {
      start = 2;
      end = start + visiblePages - 1;
    }
    if (end > total_possible_pages - 1) {
      end = total_possible_pages - 1;
      start = end - visiblePages + 1;
    }

    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);

    if (start > 2) pages.unshift("left-ellipsis");
    if (end < total_possible_pages - 1) pages.push("right-ellipsis");

    return [1, ...pages, total_possible_pages];
  };

  const pagesToShow = getPageNumbers();

  // Helper function to handle page click and scroll
  const goToPage = (p) => {
    setPage(p);
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  return (
    <section
      className="pagination-section"
      style={{ backgroundColor: "#f9fafb", marginTop: 0, paddingTop: 50 }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <nav aria-label="Page navigation">
              <ul className="pagination justify-content-center gap-2 flex-wrap">
                {/* Prev button */}
                <li className="page-item">
                  <button
                    className="page-link prev-btn"
                    onClick={() => goToPage(page - 1)}
                    disabled={page === 1}
                    style={{
                      color: page === 1 ? "white" : "",
                      cursor: page === 1 ? "not-allowed" : "pointer",
                    }}
                  >
                    <i className="bi bi-chevron-left"></i>
                  </button>
                </li>

                {/* Page numbers */}
                {pagesToShow.map((p, index) =>
                  p === "left-ellipsis" || p === "right-ellipsis" ? (
                    <li key={index} className="page-item disabled">
                      <span className="page-link">...</span>
                    </li>
                  ) : (
                    <li key={p} className={`page-item ${page === p ? "active" : ""}`}>
                      <button className="page-link" onClick={() => goToPage(p)}>
                        {p}
                      </button>
                    </li>
                  )
                )}

                {/* Next button */}
                <li className="page-item">
                  <button
                    className="page-link prev-btn"
                    onClick={() => goToPage(page + 1)}
                    disabled={page === total_possible_pages}
                    style={{
                      color: page === total_possible_pages ? "white" : "",
                      cursor: page === total_possible_pages ? "not-allowed" : "pointer",
                    }}
                  >
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </li>
              </ul>
            </nav>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 30,
              }}
            >
              <span className="text-muted" style={{ fontWeight: 500 }}>
                Showing {(page - 1) * limit + 1}–{Math.min(page * limit, total_data_items)} of{" "}
                {total_data_items} results
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pagination;
