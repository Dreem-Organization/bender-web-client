import React from 'react';
import PropTypes from 'prop-types';
import { light as theme } from 'themeConfig';
import StyledImage from './style';

function Image(props) {
  return <StyledImage className="image" {...props} alt="" />;
}

Image.propTypes = {
  theme: PropTypes.object,
  width: PropTypes.string,
  height: PropTypes.string,
  src: PropTypes.string,
};

Image.defaultProps = {
  theme,
  width: '64px',
  height: '64px',
};

export default Image;
