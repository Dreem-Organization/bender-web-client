import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { light as theme } from 'themeConfig';
import Label from 'components/Label';
import StyledHomeStepCard from './style';

function HomeStepCard(props) {
  return (
    <StyledHomeStepCard className="home-step-card" {...props}>
      <span className="step-number">{props.number}</span>
      <div className="home-step-card-container">
        <Label
          className="label step-title"
          content={props.title}
          size="sandard"
          type="important"
          theme={props.theme}
        />
        <div className="step-content-container">
          {Children.toArray(props.children)}
        </div>
        <Label
          className="label step-desc"
          content={props.desc}
          size="small"
          theme={props.theme}
        />
      </div>
    </StyledHomeStepCard>
  );
}

HomeStepCard.propTypes = {
  theme: PropTypes.object,
  number: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  desc: PropTypes.string.isRequired,
};

HomeStepCard.defaultProps = {
  theme,
};

export default HomeStepCard;
