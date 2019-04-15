import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { light as theme } from 'themeConfig';
import StyledLabel from './style';

// FIXME: the content field should strictly be a string,
// either that or the Label component should integrate
// a formatting feature. To temporarely fix the errors,
// let's format objects as JSON
function Label(props) {
  return (
    <StyledLabel className="label" {...props}>
      {Children.toArray(props.children)}
      {typeof props.content === 'object'
        ? JSON.stringify(props.content)
        : props.content}
    </StyledLabel>
  );
}

Label.propTypes = {
  theme: PropTypes.object,
  size: PropTypes.string,
  children: PropTypes.node,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

Label.defaultProps = {
  theme,
  size: 'normal',
};

export default Label;
