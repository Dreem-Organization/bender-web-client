import React from 'react';
import PropTypes from 'prop-types';
import theme from 'themeConfig';
import StyledInput from './style';

function Input(props) {
  return <StyledInput className="input" {...props} {...props.input} />;
}

Input.propTypes = {
  theme: PropTypes.object,
  input: PropTypes.object,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  theme,
};

export default Input;
