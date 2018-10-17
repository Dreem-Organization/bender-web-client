import React from 'react';
import PropTypes from 'prop-types';
import theme from 'themeConfig';
import StyledCheckbox from './style';

function Checkbox(props) {
  return (
    <StyledCheckbox className="checkbox" type="checkbox" {...props}>
      <input
        type="checkbox"
        name={props.name}
        value={props.value}
        checked={props.checked}
        onChange={props.onChange}
      />
      <span>{props.label}</span>
    </StyledCheckbox>
  );
}

Checkbox.propTypes = {
  theme: PropTypes.object,
  checked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Checkbox.defaultProps = {
  theme,
};

export default Checkbox;
