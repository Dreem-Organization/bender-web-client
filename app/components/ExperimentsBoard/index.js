import React from 'react';
import PropTypes from 'prop-types';
import theme from 'themeConfig';
import ExperimentTile from 'components/ExperimentTile';
import Button from 'components/Button';
import Label from 'components/Label';
import StyledExperimentsBoard from './style';

function ExperimentsBoard(props) {
  return (
    <StyledExperimentsBoard className="experiments-board" {...props}>
      {Object.values(props.experiments).map(e => (
        <ExperimentTile
          onClick={() => props.changeActiveExperiment(e.id)}
          key={e.id}
          experiment={e}
          onRemoveExperiment={props.onRemoveExperiment}
        />
      ))}
      {Object.keys(props.experiments).length ? (
        ''
      ) : (
        <div className="experiments-board-empty">
          <Label content="No experiment yet, create one !" type="important" />
        </div>
      )}
      <div className="experiments-board-button-container">
        <Button
          className="spec"
          type="round"
          icon="add_circle_outline"
          color="positive"
          onClick={props.openExperimentModal}
        />
      </div>
    </StyledExperimentsBoard>
  );
}

ExperimentsBoard.propTypes = {
  theme: PropTypes.object,
  experiments: PropTypes.object.isRequired,
  changeActiveExperiment: PropTypes.func.isRequired,
  openExperimentModal: PropTypes.func.isRequired,
  onRemoveExperiment: PropTypes.func.isRequired,
};

ExperimentsBoard.defaultProps = {
  theme,
};

export default ExperimentsBoard;
