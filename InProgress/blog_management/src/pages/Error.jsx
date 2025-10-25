import './Error.css';
import { Link } from 'react-router';

const Error = ({message = "Sorry, the page you are looking for might have been removed, had its name changed, or is temporarily unavailable."}) => {
  return (
    <section className="error-section d-flex align-items-center justify-content-center">
      <div className="error-container text-center">
        <h1 className="error-code">404</h1>
        <p className="error-title">Page Not Found</p>
        <p className="error-description">
          {message}
        </p>
        <Link to="/" className="btn btn-outline-light mt-4 px-4 py-2">
          ⬅ Go Back Home
        </Link>
      </div>
    </section>
  );
};

export default Error;
