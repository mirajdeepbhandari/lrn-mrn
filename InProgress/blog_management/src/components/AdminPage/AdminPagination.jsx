
import getPageNumbers from '../../utils/pagination'
import {useDispatch} from 'react-redux'


const AdminPagination = ({ page, setPage, total_data_items, limit = 8 }) => {

  const total_possible_pages = Math.ceil(total_data_items / limit);
  const visiblePages = 6;
   const pagesToShow = getPageNumbers({ page, total_possible_pages, visiblePages });
   const dispatch = useDispatch()

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
            <button className="page-link"  disabled={page === 1}
               style={{ color: page === 1 ? "gray" : "white",
                      cursor: page === 1 ? "not-allowed" : "pointer",
                      backgroundColor: page === 1 ? "#fdfdffff" : "#0d6efd",
                    }}
            onClick={() => dispatch(setPage(page - 1))}
            >Previous</button>
        </li>

        {pagesToShow.map((p, index) =>
                  p === "left-ellipsis" || p === "right-ellipsis" ? (
                    <li key={index} className="page-item disabled">
                      <span className="page-link">...</span>
                    </li>
                  ) : (
                    <li key={p} className={`page-item ${page === p ? "active" : ""}`}>
                      <button className="page-link" onClick={() => dispatch(setPage(p))}>
                        {p}
                      </button>
                    </li>
                  )
                )}

        <li className="page-item">
          <button className="page-link"  disabled={page === total_possible_pages}
           style={{ color: page === total_possible_pages ? "gray" : "white",
                      cursor: page === total_possible_pages ? "not-allowed" : "pointer",
                      backgroundColor: page === total_possible_pages ? "#ffffffff" : "#0d6efd",
                    }}
          onClick={() => dispatch(setPage(page + 1))}
          >Next</button>
        </li>
      </ul>
    </nav>
    </div>
  );
};

export default AdminPagination;
