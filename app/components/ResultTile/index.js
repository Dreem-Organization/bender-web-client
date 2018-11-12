import React from 'react';
import PropTypes from 'prop-types';
import theme from 'themeConfig';
import Title from 'components/Title';
import Label from 'components/Label';
import StyledRankTile from './style';

function RankTile(props) {
  const hps = Object.keys(props.trial.results).map(k => (
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
  return (
    <StyledRankTile
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
      <div className="rank-tile-hp-container">{props.trial ? hps : ''}</div>
    </StyledRankTile>
  );
}

RankTile.propTypes = {
  theme: PropTypes.object,
  rankBy: PropTypes.string.isRequired,
  metric: PropTypes.object.isRequired,
  trial: PropTypes.object,
  content: PropTypes.string,
};

RankTile.defaultProps = {
  theme,
};

export default RankTile;
