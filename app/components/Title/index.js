import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { light as theme } from 'themeConfig';
import StyledTitle from './style';

function Title(props) {
  return (
    <StyledTitle className="title" {...props}>
      {Children.toArray(props.children)}
      {props.content}
    </StyledTitle>
  );
}

Title.propTypes = {
  theme: PropTypes.object,
  size: PropTypes.number,
  children: PropTypes.node,
  content: PropTypes.string,
};

Title.defaultProps = {
  theme,
  size: 3,
};

export default Title;
