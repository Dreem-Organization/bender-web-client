import React from 'react';
import PropTypes from 'prop-types';
import theme from 'themeConfig';
import StyledToast from './style';

class Toast extends React.PureComponent {
  constructor(props) {
    super(props);
    setTimeout(() => {
      this.props.grill(this.props.toast.id);
    }, 1000);
  }

  componentDidUpdate(prevProps) {
    if (this.props.toast.life !== prevProps.toast.life) {
      if (this.props.toast.life > 0) {
        setTimeout(() => {
          this.props.grill(this.props.toast.id);
        }, 1000);
      } else {
        this.props.done(this.props.toast.id);
      }
    }
  }

  render() {
    return (
      <StyledToast
        className="toast"
        {...this.props}
        onClick={() => this.props.done(this.props.toast.id)}
      >
        <span>{this.props.toast.message}</span>
      </StyledToast>
    );
  }
}

Toast.propTypes = {
  theme: PropTypes.object,
  toast: PropTypes.object,
  done: PropTypes.func,
  grill: PropTypes.func,
};

Toast.defaultProps = {
  theme,
};

export default Toast;
