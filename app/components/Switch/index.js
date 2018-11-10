import React from 'react';
import PropTypes from 'prop-types';
import theme from 'themeConfig';
import StyledSwitch from './style';

function Switch(props) {
  return (
    <StyledSwitch className="switch" {...props}>
      {props.options.map(o => (
        <div className="switch-option" key={o}>
          <span>{o}</span>
        </div>
      ))}
    </StyledSwitch>
  );
}

Switch.propTypes = {
  options: PropTypes.array.isRequired,
  theme: PropTypes.object,
};

Switch.defaultProps = {
  theme,
};

export default Switch;
