import React from 'react';
import PropTypes from 'prop-types';
import { light as theme } from 'themeConfig';
import Title from 'components/Title';
// import Label from 'components/Label';
import StyledResultTile from './style';

function ResultTile(props) {
  return (
    <StyledResultTile
      className={`rank-tile ${
        props.metric.metric_name === props.rankBy ? '' : 'inactive'
      }`}
      onClick={() => props.onOpenHpModal(props.trial)}
      {...props}
    >
      <Title content={props.content} theme={props.theme} />
    </StyledResultTile>
  );
}

ResultTile.propTypes = {
  theme: PropTypes.object,
  rankBy: PropTypes.string.isRequired,
  metric: PropTypes.object.isRequired,
  trial: PropTypes.object,
  content: PropTypes.string,
  onOpenHpModal: PropTypes.func.isRequired,
};

ResultTile.defaultProps = {
  theme,
};

export default ResultTile;
