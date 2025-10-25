

const Pagination = () => {
  return (
      <section className="pagination-section " style={{ backgroundColor: "#f9fafb ", marginTop: "0px", paddingTop: "50px" }}>
        <div className="container">
            <div className="row">
                <div className="col-lg-8 mx-auto"> 
                    <nav aria-label="Page navigation">
                        <ul className="pagination justify-content-center gap-2 flex-wrap">
                            <li className="page-item">
                                <a className="page-link prev-btn" href="#" aria-label="Previous">
                                    <i className="bi bi-chevron-left"></i>
                                </a>
                            </li>
                            <li className="page-item active"><a className="page-link" href="#" data-page="1">1</a></li>
                            <li className="page-item"><a className="page-link" href="#" data-page="2">2</a></li>
                            <li className="page-item"><a className="page-link" href="#" data-page="3">3</a></li>
                            <li className="page-item"><a className="page-link" href="#" data-page="4">4</a></li>
                            <li className="page-item"><a className="page-link" href="#" data-page="5">5</a></li>
                            <li className="page-item">
                                <a className="page-link next-btn" href="#" aria-label="Next">
                                    <i className="bi bi-chevron-right"></i>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "30px"}}>
                        <span className="text-muted" style={{ fontWeight: "500"}}>Showing 1-9 of 50 results</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Pagination