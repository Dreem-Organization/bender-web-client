import React, { Children } from 'react';
import PropTypes from 'prop-types';
import theme from 'themeConfig';
import Icon from 'components/Icon';
import StyledButton from './style';

function Button(props) {
  return (
    <StyledButton className="button" {...props}>
      {props.icon ? (
        <Icon name={props.icon} />
      ) : (
        (Children.toArray(props.children), props.content)
      )}
    </StyledButton>
  );
}

Button.propTypes = {
  theme: PropTypes.object,
  type: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.node,
  content: PropTypes.string,
};

Button.defaultProps = {
  theme,
};

export default Button;
