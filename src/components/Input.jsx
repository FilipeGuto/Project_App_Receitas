import React from 'react';
import PropTypes from 'prop-types';

import '../css/Input.css';

function Input({ placeHolder, type, name, testId, min, value, id, text, setValue }) {
  return (
    <label htmlFor={ id } className="form-input">
      {text}
      <input
        type={ type }
        onChange={ ({ target }) => setValue(target.value) }
        name={ name }
        id={ id }
        data-testid={ testId }
        placeholder={ placeHolder }
        min={ min }
        value={ value }
      />
    </label>
  );
}
Input.defaultProps = {
  testId: '',
  min: 0,
  text: '',
  placeHolder: '',
};
Input.propTypes = {
  id: PropTypes.string,
  min: PropTypes.number,
  name: PropTypes.string,
  placeHolder: PropTypes.string,
  setEmail: PropTypes.func,
  testId: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
}.isRequired;

export default Input;
