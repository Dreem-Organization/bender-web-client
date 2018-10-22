import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import Icon from 'components/Icon';
import theme from 'themeConfig';
import StyledExperimentTile from './style';

function ExperimentTile(props) {
  return (
    <StyledExperimentTile className="experiment-tile" {...props}>
      <div className="experiment-tile-info-container">
        <span className="experiment-tile-name">{props.experiment.name}</span>
        <span className="experiment-tile-owner">
          <Icon name="person_outline" />
          {props.experiment.owner}
        </span>
      </div>
      <div className="experiment-tile-meta-container">
        <div className="experiment-tile-meta-sub-container">
          <span className="experiment-tile-number">
            {props.experiment.algo_count}
          </span>
          <span className="experiment-tile-label">ALGOS</span>
        </div>
        <div className="experiment-tile-meta-sub-container">
          <span className="experiment-tile-number">
            {props.experiment.trial_count}
          </span>
          <span className="experiment-tile-label">TRIALS</span>
        </div>
        <Button
          type="round"
          icon="remove_circle_outline"
          color="negative"
          onClick={e => {
            e.stopPropagation();
            props.onRemoveExperiment(props.experiment.id);
          }}
        />
      </div>
    </StyledExperimentTile>
  );
}

ExperimentTile.propTypes = {
  theme: PropTypes.object,
  experiment: PropTypes.object.isRequired,
  onRemoveExperiment: PropTypes.func.isRequired,
};

ExperimentTile.defaultProps = {
  theme,
};

export default ExperimentTile;
