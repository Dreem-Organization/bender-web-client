import React from 'react';
import PropTypes from 'prop-types';
import theme from 'themeConfig';
import ModalCreateExperiment from 'components/ModalCreateExperiment';
import ModalCreateAlgo from 'components/ModalCreateAlgo';
import Icon from 'components/Icon';
import StyledModals from './style';

function Modals(props) {
  let toRender = '';
  if (props.modalStates.open) {
    switch (props.modalStates.name) {
      case 'experimentCreate':
        toRender = (
          <ModalCreateExperiment onValidate={props.onCreateExperiment} />
        );
        break;
      case 'algoCreate':
        toRender = (
          <ModalCreateAlgo onValidate={props.onCreateAlgo} update={false} />
        );
        break;
      case 'algoUpdate':
        toRender = (
          <ModalCreateAlgo
            onValidate={data =>
              props.onUpdateAlgo({ id: props.modalStates.meta.id, ...data })
            }
            update
            algo={props.modalStates.meta}
          />
        );
        break;
      default:
        console.log('UNEXPECTED MODAL NAME');
    }
  }
  return (
    <StyledModals
      className={`modals ${props.modalStates.open ? 'is-open' : ''}`}
      {...props}
      onClick={props.onClose}
    >
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal">{toRender}</div>
        <div onClick={props.onClose} className="modal-close">
          <Icon name="clear" />
        </div>
      </div>
    </StyledModals>
  );
}

Modals.propTypes = {
  theme: PropTypes.object,
  modalStates: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  onCreateExperiment: PropTypes.func.isRequired,
  onCreateAlgo: PropTypes.func.isRequired,
  onUpdateAlgo: PropTypes.func.isRequired,
};

Modals.defaultProps = {
  theme,
};

export default Modals;
