import React from 'react';
import PropTypes from 'prop-types';
import theme from 'themeConfig';
import Title from 'components/Title';
import Label from 'components/Label';
import StyledRankTile from './style';

function RankTile(props) {
  let letters = '--';
  switch (props.rank) {
    case '1':
      letters = 'st';
      break;
    case '2':
      letters = 'nd';
      break;
    case '3':
      letters = 'rd';
      break;
    case '?':
      letters = '';
      break;
    default:
      letters = 'th';
  }
  return (
    <StyledRankTile className="rank-tile" {...props}>
      <Title
        className={props.rank === '?' ? 'title unranked' : 'title'}
        content={props.rank.toString()}
      />
      <Label
        size="tiny"
        type={props.rank !== '?' ? 'important' : ''}
        content={letters}
      />
    </StyledRankTile>
  );
}

RankTile.propTypes = {
  theme: PropTypes.object,
  rank: PropTypes.string.isRequired,
};

RankTile.defaultProps = {
  theme,
};

export default RankTile;
