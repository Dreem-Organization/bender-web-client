import React from 'react';
import { PropTypes } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { CSSTransitionGroup } from 'react-transition-group';
import Toast from 'components/Toast';
import injectReducer from 'utils/injectReducer';
import toasterReducer from './reducer';
import { makeSelectToasts } from './selectors';
import { PUT_TOAST, GRILL_TOAST, TOAST_READY } from './constants';

const ToasterView = styled.div`
  position: absolute;
  z-index: 1001;
  right: 0;
  top: 0;
  width: 300px;
`;

/* eslint-disable react/prefer-stateless-function */
export class Toaster extends React.PureComponent {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const toasts = Object.values(this.props.toasts).map(t => (
      <Toast
        key={t.id}
        toast={t}
        grill={this.props.grillToast}
        done={this.props.toastReady}
      />
    ));
    return (
      <ToasterView>
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={700}
        >
          {toasts}
        </CSSTransitionGroup>
      </ToasterView>
    );
  }
}

Toaster.displayName = 'Toaster';
Toaster.propTypes = {
  toasts: PropTypes.object,
  // putToast: PropTypes.func,
  grillToast: PropTypes.func,
  toastReady: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    putToast: toast => dispatch({ type: PUT_TOAST, payload: toast }),
    grillToast: id => dispatch({ type: GRILL_TOAST, payload: id }),
    toastReady: id => dispatch({ type: TOAST_READY, payload: id }),
  };
}

const mapStateToProps = createStructuredSelector({
  toasts: makeSelectToasts(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'toaster', reducer: toasterReducer });

export default compose(
  withReducer,
  withConnect,
)(Toaster);
