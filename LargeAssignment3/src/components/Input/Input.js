import React from 'react';
import PropTypes from 'prop-types';

const Input = props => {
  const { value, onInput, type, errorMessage, label, name, htmlId } = props;
  return (
    <div className="form-group">
      {
        label
        ?
        <label htmlFor={ htmlId } className="control-label">{ label }</label>
        :
        <></>
      }
      <input
        type={ type }
        value={ value }
        onChange={ onInput }
        name={ name }
        id={ htmlId }
        className="form-control" />
      <span className="error">{ errorMessage }</span>
    </div>
  );
};

Input.propTypes = {
  // The value provided to the input HTML tag
  value: PropTypes.string.isRequired,
  // The htmlId provided to the input HTML tag
  htmlId: PropTypes.string.isRequired,
  // The name provided to the input HTML tag
  name: PropTypes.string.isRequired,
  // The onInput function provided to the input HTML tag
  onInput: PropTypes.func.isRequired,
  // The typeof the input HTML tag needs to be
  type: PropTypes.oneOf([ 'text', 'number', 'submit' ]),
  // The errorMessage provided to the input HTML tag
  errorMessage: PropTypes.string,
  // The label provided to the input HTML tag
  label: PropTypes.string
};

export default Input;
