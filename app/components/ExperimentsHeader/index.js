import React from 'react';
import PropTypes from 'prop-types';
import theme from 'themeConfig';
import Title from 'components/Title';
import Icon from 'components/Icon';
import Label from 'components/Label';
import ClipBoardButton from 'components/ClipBoardButton';
import StyledExperiments from './style';

function ExperimentsHeader(props) {
  const experimentName = props.experiments.list[props.stage.exp]
    ? props.experiments.list[props.stage.exp].name
    : '';
  return (
    <StyledExperiments className="experiments" {...props}>
      <div className="experiments-head-container">
        <div className="experiments-head-sub-container">
          {props.stage.layer === 0 ? (
            <Title content="Welcome" size={2} />
          ) : (
            <div className="experiments-head-portion">
              <Icon
                className="material-icons experiments-home"
                name="view_list"
                onClick={() =>
                  props.stageUpdate({ layer: 0, exp: '', algo: '' })
                }
              />
              <Icon
                className="material-icons experiments-link"
                name="linear_scale"
              />
              <Title
                className={`${
                  props.stage.layer !== 1 ? 'title link' : 'title'
                }`}
                content={experimentName}
                size={2}
                onClick={() =>
                  props.stageUpdate({
                    layer: 1,
                    exp: props.stage.exp,
                    algo: '',
                  })
                }
              />
            </div>
          )}
          {props.stage.layer >= 2 ? (
            <div className="experiments-head-portion">
              <Icon
                className="material-icons experiments-link"
                name="linear_scale"
              />
              <Title
                className={`${props.stage.layer !== 3 ? 'link' : ''}`}
                content="Experiments"
                size={2}
                onClick={() =>
                  props.stageUpdate({ layer: 0, exp: '', algo: '' })
                }
              />
            </div>
          ) : (
            ''
          )}
        </div>
        {props.stage.layer === 3 ? (
          <div className="experiments-head-sub-container">
            <ClipBoardButton value={props.stage.exp} />
          </div>
        ) : (
          ''
        )}
      </div>
      {props.stage.layer === 200 ? (
        <div className="experiments-infos-container">
          <Icon name="info" />
          <div className="experiments-infos-sub-container">
            <Label content="Owner :" size="tiny" type="important" />
            <Label
              content={props.experiments.list[props.stage.exp].owner}
              size="tiny"
              type="simple"
            />
          </div>
          <div className="experiments-infos-sub-container">
            <Label content="Dataset :" size="tiny" type="important" />
            <Label
              content={props.experiments.list[props.stage.exp].dataset}
              size="tiny"
              type="simple"
            />
          </div>
          <div className="experiments-infos-sub-container">
            <Label content="About :" size="tiny" type="important" />
            <Label
              content={props.experiments.list[props.stage.exp].description}
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

ExperimentsHeader.propTypes = {
  stage: PropTypes.object.isRequired,
  theme: PropTypes.object,
  experiments: PropTypes.object.isRequired,
  stageUpdate: PropTypes.func,
};

ExperimentsHeader.defaultProps = {
  theme,
};

export default ExperimentsHeader;
