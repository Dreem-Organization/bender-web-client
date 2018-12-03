import React from 'react';
import PropTypes from 'prop-types';
import { light as theme } from 'themeConfig';
import StyledIcon from './style';

function Icon(props) {
  return (
    <StyledIcon className="material-icons" {...props}>
      {props.name}
    </StyledIcon>
  );
}

Icon.propTypes = {
  theme: PropTypes.object,
  name: PropTypes.string,
};

Icon.defaultProps = {
  theme,
};

export default Icon;
