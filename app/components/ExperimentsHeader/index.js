import React from 'react';
import PropTypes from 'prop-types';
import theme from 'themeConfig';
import { Link } from 'react-router-dom';
import Title from 'components/Title';
import Icon from 'components/Icon';
import Label from 'components/Label';
import ClipBoardButton from 'components/ClipBoardButton';
import StyledExperiments from './style';

function Experiments(props) {
  return (
    <StyledExperiments className="experiments" {...props}>
      <div className="experiments-head-container">
        <div className="experiments-head-sub-container">
          <Title
            className="link"
            content="Experiments"
            size={2}
            onClick={props.resetSelected}
          />
          {props.experiments.selected !== '' ? (
            <Title
              className="selected"
              content={`> ${
                props.experiments.list[props.experiments.selected].name
              }`}
              size={2}
            />
          ) : (
            ''
          )}
        </div>
        {props.experiments.selected !== '' ? (
          <div className="experiments-head-sub-container">
            <ClipBoardButton value={props.experiments.selected} />
          </div>
        ) : (
          ''
        )}
      </div>
      {props.experiments.selected !== '' ? (
        <div className="experiments-infos-container">
          <Icon name="info" />
          <div className="experiments-infos-sub-container">
            <Label content="Owner :" size="tiny" type="important" />
            <Label
              content={props.experiments.list[props.experiments.selected].owner}
              size="tiny"
              type="simple"
            />
          </div>
          <div className="experiments-infos-sub-container">
            <Label content="Dataset :" size="tiny" type="important" />
            <Label
              content={
                props.experiments.list[props.experiments.selected].dataset
              }
              size="tiny"
              type="simple"
            />
          </div>
          <div className="experiments-infos-sub-container">
            <Label content="About :" size="tiny" type="important" />
            <Label
              content={
                props.experiments.list[props.experiments.selected].description
              }
              size="tiny"
              type="simple"
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </StyledExperiments>
  );
}

Experiments.propTypes = {
  theme: PropTypes.object,
  experiments: PropTypes.object.isRequired,
  resetSelected: PropTypes.func,
};

Experiments.defaultProps = {
  theme,
};

export default Experiments;
