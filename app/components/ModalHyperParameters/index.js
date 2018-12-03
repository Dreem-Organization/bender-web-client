// /* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { light as theme } from 'themeConfig';
import Title from 'components/Title';
import Button from 'components/Button';
import StyledModalHyperParameters from './style';

function ModalHyperParameters(props) {
  const hps = Object.keys(props.trial.parameters).map(k => (
    <div key={k} className="modal-hyper-parameters-sub">
      <input onFocus={e => e.target.select()} value={k} readOnly />
      <input
        onFocus={e => e.target.select()}
        value={props.trial.parameters[k]}
        readOnly
      />
    </div>
  ));
  const metrics = Object.keys(props.trial.results).map(k => (
    <div key={k} className="modal-hyper-parameters-sub">
      <input onFocus={e => e.target.select()} value={k} readOnly />
      <input
        onFocus={e => e.target.select()}
        value={parseFloat(props.trial.results[k].toFixed(4))}
        readOnly
      />
    </div>
  ));
  return (
    <StyledModalHyperParameters className="modal-hyper-parameters" {...props}>
      <section>
        <Title content="Hyper Parameters" theme={props.theme} />
        <div className="modal-hyper-parameters-container">{hps}</div>
        <Button
          content="COPY JSON"
          onClick={() => {
            const el = document.createElement('textarea');
            el.value = JSON.stringify(props.trial.parameters);
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
          }}
        />
      </section>
      <section>
        <Title content="Metrics" theme={props.theme} />
        <div className="modal-hyper-parameters-container">{metrics}</div>
        <Button
          content="COPY JSON"
          onClick={() => {
            const el = document.createElement('textarea');
            el.value = JSON.stringify(props.trial.results);
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
          }}
        />
      </section>
    </StyledModalHyperParameters>
  );
}

ModalHyperParameters.propTypes = {
  theme: PropTypes.object,
  trial: PropTypes.object,
};

ModalHyperParameters.defaultProps = {
  theme,
};

export default ModalHyperParameters;
