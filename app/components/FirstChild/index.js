import React from 'react';
import PropTypes from 'prop-types';

function FirstChild(props) {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
}

FirstChild.propTypes = {
  theme: PropTypes.object,
  size: PropTypes.number,
  children: PropTypes.node,
  content: PropTypes.string,
};

export default FirstChild;
