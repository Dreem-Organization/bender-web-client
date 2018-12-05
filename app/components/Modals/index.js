import React from 'react';
import PropTypes from 'prop-types';
import { light as theme } from 'themeConfig';
import ModalCreateExperiment from 'components/ModalCreateExperiment';
import ModalCreateAlgo from 'components/ModalCreateAlgo';
import ModalProfile from 'components/ModalProfile';
import ModalContact from 'components/ModalContact';
import ModalHyperParameters from 'components/ModalHyperParameters';
import Icon from 'components/Icon';
import StyledModals from './style';

function Modals(props) {
  let toRender = '';
  if (props.modalStates.open) {
    switch (props.modalStates.name) {
      case 'profile':
        toRender = (
          <ModalProfile
            onToggleTheme={props.onToggleTheme}
            user={props.user}
            theme={props.theme}
          />
        );
        break;
      case 'contact':
        toRender = (
          <ModalContact theme={props.theme} onValidate={props.onContact} />
        );
        break;
      case 'hp':
        toRender = (
          <ModalHyperParameters
            trial={props.modalStates.meta}
            theme={props.theme}
          />
        );
        break;
      case 'experimentCreate':
        toRender = (
          <ModalCreateExperiment
            onValidate={props.onCreateExperiment}
            theme={props.theme}
          />
        );
        break;
      case 'algoCreate':
        toRender = (
          <ModalCreateAlgo
            onValidate={props.onCreateAlgo}
            update={false}
            theme={props.theme}
          />
        );
        break;
      case 'algoUpdate':
        toRender = (
          <ModalCreateAlgo
            onValidate={data =>
              props.onUpdateAlgo({ id: props.modalStates.meta.id, ...data })
            }
            update
            theme={props.theme}
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
          <Icon name="clear" theme={props.theme} />
        </div>
      </div>
    </StyledModals>
  );
}

Modals.propTypes = {
  theme: PropTypes.object,
  user: PropTypes.object,
  onToggleTheme: PropTypes.func,
  onContact: PropTypes.func,
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
