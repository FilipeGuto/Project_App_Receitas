import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function ButtonExplorer({ id, dataTest, className, onClick, text }) {
  return (
    // Refer: https://react-bootstrap.github.io/components/buttons/
    <Button
      id={ id }
      data-testid={ dataTest }
      type="button"
      className={ className }
      variant="outline-dark"
      onClick={ onClick }
    >
      {text}
    </Button>
  );
}

ButtonExplorer.propTypes = {
  id: PropTypes.string,
  dataTest: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
}.isRequired;

export default ButtonExplorer;
