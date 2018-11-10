import React from 'react';
import PropTypes from 'prop-types';
import theme from 'themeConfig';
import StyledSwitch from './style';

function Switch(props) {
  return (
    <StyledSwitch className="switch" {...props}>
      {props.options.map(o => (
        <div
          className={`switch-option ${
            props.input.value === o.value ? 'selected' : ''
          }`}
          onClick={() => props.input.onChange(o.value)}
          key={o.label}
        >
          <span>{o.label}</span>
        </div>
      ))}
    </StyledSwitch>
  );
}

Switch.propTypes = {
  options: PropTypes.array.isRequired,
  theme: PropTypes.object,
  input: PropTypes.object,
};

Switch.defaultProps = {
  theme,
};

export default Switch;
