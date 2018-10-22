import React, { Children } from 'react';
import PropTypes from 'prop-types';
import theme from 'themeConfig';
import { Eye } from 'react-preloading-component';
import StyledWaitingWrapper from './style';

function WaitingWrapper(props) {
  return (
    <StyledWaitingWrapper className="waiting-wrapper" {...props}>
      {Children.toArray(props.children)}
      <div className={`page-loader ${props.pageLoader}`}>
        <Eye color={theme.main} size={100} />
      </div>
    </StyledWaitingWrapper>
  );
}

WaitingWrapper.propTypes = {
  theme: PropTypes.object,
  children: PropTypes.node,
  pageLoader: PropTypes.string,
  show: PropTypes.bool,
};

WaitingWrapper.defaultProps = {
  theme,
};

export default WaitingWrapper;
