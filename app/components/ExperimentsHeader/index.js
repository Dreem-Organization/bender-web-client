import React from 'react';
import PropTypes from 'prop-types';
import { light as theme } from 'themeConfig';
import Title from 'components/Title';
import Icon from 'components/Icon';
import Label from 'components/Label';
import ClipBoardButton from 'components/ClipBoardButton';
import StyledExperiments from './style';

function ExperimentsHeader(props) {
  const experimentName = props.experiments.list[props.stage.exp]
    ? props.experiments.list[props.stage.exp].name
    : '';
  const fullyLoaded =
    props.experiments.list[props.stage.exp] &&
    props.experiments.list[props.stage.exp].algos.list[props.stage.algo];
  return (
    <StyledExperiments className="experiments" {...props}>
      <div className="experiments-head-container">
        <div className="experiments-head-sub-container">
          {props.stage.layer === 0 ? (
            <Title content="Welcome" size={2} theme={props.theme} />
          ) : (
            <div className="experiments-head-portion">
              <Icon
                className="material-icons experiments-home"
                name="view_list"
                onClick={() =>
                  props.stageUpdate({ layer: 0, exp: '', algo: '' })
                }
                theme={props.theme}
              />
              <Icon
                className="material-icons experiments-link"
                name="linear_scale"
                theme={props.theme}
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
                theme={props.theme}
              />
            </div>
          )}
          {props.stage.layer >= 2 ? (
            <div className="experiments-head-portion">
              <Icon
                className="material-icons experiments-link"
                name="linear_scale"
                theme={props.theme}
              />
              <Title
                className={`${props.stage.layer !== 3 ? 'link' : ''}`}
                content="Experiments"
                size={2}
                onClick={() =>
                  props.stageUpdate({ layer: 0, exp: '', algo: '' })
                }
                theme={props.theme}
              />
            </div>
          ) : (
            ''
          )}
        </div>
        {props.stage.layer === 1 ? (
          <div className="experiments-head-sub-container">
            <ClipBoardButton value={props.stage.exp} theme={props.theme} />
          </div>
        ) : (
          ''
        )}
        {props.stage.layer === 2 || props.stage.layer === 3 ? (
          <div className="experiments-head-sub-container">
            <ClipBoardButton value={props.stage.algo} theme={props.theme} />
          </div>
        ) : (
          ''
        )}
      </div>
      {props.stage.layer === 1 ? (
        <div className="experiments-infos-container">
          <Icon name="info" theme={props.theme} />
          <div className="experiments-infos-sub-container">
            <Label
              content="Owner :"
              size="tiny"
              type="important"
              theme={props.theme}
            />
            <Label
              content={
                props.experiments.list[props.stage.exp]
                  ? props.experiments.list[props.stage.exp].owner
                  : ''
              }
              size="tiny"
              type="simple"
              theme={props.theme}
            />
          </div>
          <div className="experiments-infos-sub-container">
            <Label
              content="Dataset :"
              size="tiny"
              type="important"
              theme={props.theme}
            />
            <Label
              content={
                props.experiments.list[props.stage.exp]
                  ? props.experiments.list[props.stage.exp].dataset
                  : ''
              }
              size="tiny"
              type="simple"
              theme={props.theme}
            />
          </div>
          <div className="experiments-infos-sub-container">
            <Label
              content="About :"
              size="tiny"
              type="important"
              theme={props.theme}
            />
            <Label
              content={
                props.experiments.list[props.stage.exp]
                  ? props.experiments.list[props.stage.exp].description
                  : ''
              }
              size="tiny"
              type="simple"
              theme={props.theme}
            />
          </div>
        </div>
      ) : (
        ''
      )}
      {fullyLoaded && (props.stage.layer === 2 || props.stage.layer === 3) ? (
        <div className="experiments-infos-container">
          <Icon name="info" theme={props.theme} />
          <div className="experiments-infos-sub-container">
            <Label
              content="Owner :"
              size="tiny"
              type="important"
              theme={props.theme}
            />
            <Label
              content={
                props.experiments.list[props.stage.exp].algos.list[
                  props.stage.algo
                ].owner
              }
              size="tiny"
              type="simple"
              theme={props.theme}
            />
          </div>
          <div className="experiments-infos-sub-container">
            <Label
              content="Hyper-Parameters :"
              size="tiny"
              type="important"
              theme={props.theme}
            />
            {props.experiments.list[props.stage.exp].algos.list[
              props.stage.algo
            ].parameters.map((p, i) => (
              <Label
                content={`${i === 0 ? '' : '-'} ${p.name}`}
                size="tiny"
                type="simple"
                key={p.name}
                theme={props.theme}
              />
            ))}
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
