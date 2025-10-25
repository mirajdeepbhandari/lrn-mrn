import { Link } from 'react-router';
const AlertBox = ({ errorMsg = "An error occurred", type = "danger", link=false, extraData=""}) => {
  return (
    <div className={`alert alert-${type}`} role="alert">
      {errorMsg} {link && <Link 
      to="/auth/verify-email" 
      state={{ email: extraData }}
      ><span>Verify</span></Link >}
    </div>
  );
};

export default AlertBox;
