import React from 'react';
import PropTypes from 'prop-types';
import theme from 'themeConfig';
import Title from 'components/Title';
import Label from 'components/Label';
import StyledResultTile from './style';

function ResultTile(props) {
  let hps = '';
  if (props.trial) {
    hps = Object.keys(props.trial.results).map(k => (
      <div key={k} className="rank-tile-hp">
        <input
          className="left"
          onFocus={e => e.target.select()}
          value={k}
          readOnly
        />
        <input
          className="right"
          onFocus={e => e.target.select()}
          value={parseFloat(props.trial.results[k].toFixed(4))}
          readOnly
        />
      </div>
    ));
  }
  return (
    <StyledResultTile
      className={`rank-tile ${
        props.metric.metric_name === props.rankBy ? '' : 'inactive'
      }`}
      {...props}
    >
      <Title content={props.content} />
      {props.trial ? (
        <Label content="With HyperParameters" size="tiny" type="important" />
      ) : (
        ''
      )}
      <div className="rank-tile-hp-container">{hps}</div>
    </StyledResultTile>
  );
}

ResultTile.propTypes = {
  theme: PropTypes.object,
  rankBy: PropTypes.string.isRequired,
  metric: PropTypes.object.isRequired,
  trial: PropTypes.object,
  content: PropTypes.string,
};

ResultTile.defaultProps = {
  theme,
};

export default ResultTile;
