import React, { Children } from 'react';
import PropTypes from 'prop-types';
import theme from 'themeConfig';
import { Eye } from 'react-preloading-component';
import StyledWaitingWrapper from './style';

class WaitingWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.show ? '' : 'hide',
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.show && !this.props.show) {
      setTimeout(() => {
        this.setState({
          status: 'out',
        });
      }, this.props.timeout);
      setTimeout(() => {
        this.setState({
          status: 'hide',
        });
      }, this.props.timeout + 1000);
    }
  }

  render() {
    return (
      <StyledWaitingWrapper className="waiting-wrapper" {...this.props}>
        {Children.toArray(this.props.children)}
        <div className={`page-loader ${this.state.status}`}>
          <Eye color={theme.main} size={100} />
        </div>
      </StyledWaitingWrapper>
    );
  }
}

WaitingWrapper.propTypes = {
  theme: PropTypes.object,
  children: PropTypes.node,
  show: PropTypes.bool,
  timeout: PropTypes.number,
};

WaitingWrapper.defaultProps = {
  timeout: 0,
};

WaitingWrapper.defaultProps = {
  theme,
};

export default WaitingWrapper;
