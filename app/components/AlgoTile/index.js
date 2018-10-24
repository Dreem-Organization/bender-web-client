import React from 'react';
import PropTypes from 'prop-types';
import theme from 'themeConfig';
import Icon from 'components/Icon';
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
        <span className="algo-tile-trials">{`* ${
          props.algo.trial_count
        } trials *`}</span>
      </div>
      <span className="algo-tile-hyper">Hyperparameters</span>
      {props.algo.parameters.map(p => (
        <div key={JSON.stringify(p)} className="algo-tile-param-container">
          <div className="algo-tile-params-container">
            <span className="algo-tile-param-name">{`${p.name} :`}</span>
            <span className="algo-tile-param-category">{p.category}</span>
          </div>
          {/* {
            typeof p.search_space === 'array' ? (
              p.search_space.map(val => (
                <div key={val} className="algo-tile-search-space-container">
                  <span>{val}</span>
                </div>
              ))
            ) : (
              Object.keys(p.search_space).map(key => (
                <div key={key} className="algo-tile-search-space-container">
                  <span>{`${key}: ${p.search_space[key]}`}</span>
                </div>
              ))
            )
          } */}
        </div>
      ))}
      <ClipBoardButton value={props.algo.id} />
    </StyledAlgoTile>
  );
}

AlgoTile.propTypes = {
  theme: PropTypes.object,
  algo: PropTypes.object.isRequired,
  onRemoveAlgo: PropTypes.func.isRequired,
  onUpdateAlgo: PropTypes.func.isRequired,
};

AlgoTile.defaultProps = {
  theme,
};

export default AlgoTile;
