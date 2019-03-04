// /* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { light as theme } from 'themeConfig';
import Title from 'components/Title';
import Button from 'components/Button';
import StyledModalConfirm from './style';

function ModalConfirm(props) {
  return (
    <StyledModalConfirm className="modal-create-experiment" {...props}>
      <Title content="Sure ?" theme={props.theme} />
      <Button content="Yes" onClick={() => props.confirm(true)} />
      <Button content="No" onClick={() => props.confirm(false)} />
    </StyledModalConfirm>
  );
}

ModalConfirm.propTypes = {
  theme: PropTypes.object,
  user: PropTypes.object,
  confirm: PropTypes.func,
};

ModalConfirm.defaultProps = {
  theme,
};

export default ModalConfirm;
