import React from 'react';
import PropTypes from 'prop-types';

import '../css/Button.css';

function Button({ onClick, id, dataTest, text, disabled, className }) {
  return (
    <button
      type="button"
      onClick={ onClick }
      disabled={ disabled }
      id={ id }
      className={ className }
      data-testid={ dataTest }
    >
      {text}
    </button>
  );
}

Button.defaultProps = {
  className: 'form-button',
};

Button.propTypes = {
  onClick: PropTypes.func,
  id: PropTypes.string,
  dataTest: PropTypes.string,
  text: PropTypes.string,
  disabled: PropTypes.bool,
}.isRequired;

export default Button;
