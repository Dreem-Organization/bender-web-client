import React from 'react';
import PropTypes from 'prop-types';
import { light as theme } from 'themeConfig';
import StyledSwitch from './style';

function Switch(props) {
  const isError =
    props.meta.error &&
    ((props.meta.visited && !props.meta.active) || props.meta.submitFailed);
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
      {isError ? (
        <div className="input-error">
          <div className="input-error-arrow" />
          <span>{props.meta.error}</span>
        </div>
      ) : (
        ''
      )}
    </StyledSwitch>
  );
}

Switch.propTypes = {
  options: PropTypes.array.isRequired,
  theme: PropTypes.object,
  meta: PropTypes.object,
  input: PropTypes.object,
};

Switch.defaultProps = {
  theme,
};

export default Switch;
