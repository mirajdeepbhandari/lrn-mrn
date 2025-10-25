import PropTypes from 'prop-types';
import {Button, Spinner} from 'react-bootstrap';

const CustomButton = ({ color = "favorite", label = "Submit" , isdisabled = false, loading = false , onClick, customclass}) => {
  return (
    <Button variant={color} disabled={isdisabled} onClick={()=> onClick()}  className={customclass} >
        {loading && <Spinner animation="border" variant="danger"  size="sm"/>}
        &nbsp;
        {label}
        </Button>
  );
};

CustomButton.propTypes = {
  color: PropTypes.string,
  label: PropTypes.string,
  isdisabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  customclass: PropTypes.string
};

export default CustomButton;

