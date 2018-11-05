import React from 'react';
import PropTypes from 'prop-types';
import theme from 'themeConfig';
import Icon from 'components/Icon';
import Button from 'components/Button';
import ClipBoardButton from 'components/ClipBoardButton';
import StyledAlgoTile from './style';

function AlgoTile(props) {
  return (
    <StyledAlgoTile className="algo-tile" {...props}>
      <div className="algo-tile-ud-container">
        <Icon
          className="material-icons update"
          name="edit"
          onClick={e => {
            e.stopPropagation();
            props.onUpdateAlgo(props.algo);
          }}
        />
        <Icon
          className="material-icons delete"
          name="clear"
          onClick={e => {
            e.stopPropagation();
            props.onRemoveAlgo(props.algo.id);
          }}
        />
      </div>
      <div className="algo-tile-head">
        <span className="algo-tile-name">{props.algo.name}</span>
        <span className="algo-tile-trials">{`- ${
          props.algo.trial_count
        } Trials`}</span>
      </div>
      <ClipBoardButton value={props.algo.id} />
      {props.algo.trial_count > 0 ? (
        <div className="algo-tile-buttons-container">
          <Button
            type="inverted"
            content="Visualize Trials"
            onClick={() => props.onVisualizeTrials(props.algo.id, true)}
          />
          <Button
            type="inverted"
            content="Explore Hyper Parameters"
            onClick={() => props.onVisualizeTrials(props.algo.id, false)}
          />
        </div>
      ) : (
        <div className="algo-tile-buttons-container">
          <Button type="inverted" content="How to add trials ?" />
        </div>
      )}
    </StyledAlgoTile>
  );
}

AlgoTile.propTypes = {
  theme: PropTypes.object,
  algo: PropTypes.object.isRequired,
  onVisualizeTrials: PropTypes.func.isRequired,
  onRemoveAlgo: PropTypes.func.isRequired,
  onUpdateAlgo: PropTypes.func.isRequired,
};

AlgoTile.defaultProps = {
  theme,
};

export default AlgoTile;
