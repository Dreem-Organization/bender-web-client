import React, { Children } from 'react';
import PropTypes from 'prop-types';
import StyledLabel from './style';
import theme from 'themeConfig';

function Label(props) {
  return (
    <StyledLabel className="label" {...props}>
      {Children.toArray(props.children)}
      {props.content}
    </StyledLabel>
  );
}

Label.propTypes = {
  theme: PropTypes.object,
  size: PropTypes.string,
  children: PropTypes.node,
  content: PropTypes.string,
};

Label.defaultProps = {
  theme,
  size: 'normal',
};

export default Label;
