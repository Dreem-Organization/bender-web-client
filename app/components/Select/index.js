import React from 'react';
import PropTypes from 'prop-types';
import { light as theme } from 'themeConfig';
import StyledSelect from './style';

function Select(props) {
  return (
    <StyledSelect className="select" {...props}>
      {props.label ? <span>{props.label}</span> : ''}
      <label htmlFor="#">
        <select
          selected={props.selected}
          onChange={e => props.onSelectionChange(e.target.value)}
          {...props.input}
        >
          {props.values.map(val => (
            <option key={val.id} value={val.id} disabled={val.id === ''}>
              {val.label}
            </option>
          ))}
        </select>
      </label>
    </StyledSelect>
  );
}

Select.propTypes = {
  theme: PropTypes.object,
  input: PropTypes.object,
  values: PropTypes.array.isRequired,
  selected: PropTypes.string.isRequired,
  onSelectionChange: PropTypes.func.isRequired,
  label: PropTypes.string,
};

Select.defaultProps = {
  theme,
};

export default Select;
