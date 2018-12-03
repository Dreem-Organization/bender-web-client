import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';
import Label from 'components/Label';
import { light as theme } from 'themeConfig';
import StyledDetails from './style';

function Details(props) {
  const point = props.trials[props.selectedPoint];
  if (props.trials.length === 0) {
    return '';
  }
  return (
    <StyledDetails className="details" {...props}>
      <div className="details-head">
        <div className="details-head-sub">
          <Icon name="bar_chart" theme={props.theme} />
          <Label
            content="Point Details :"
            size="tiny"
            type="important"
            theme={props.theme}
          />
        </div>
        {point ? (
          <div className="details-head-under">
            <Label
              content={point.algo_name}
              size="mini"
              type="important"
              theme={props.theme}
            />
            <Label
              content={point.owner}
              size="mini"
              type="important"
              theme={props.theme}
            />
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="details-body">
        {props.selectedPoint !== -1 ? (
          <div className="details-body-sub">
            <div className="details-pm-container">
              <Label
                className="details-subtitle"
                content="Parameters"
                size="tiny"
                type="important"
                theme={props.theme}
              />
              {Object.keys(point.parameters).map(k => (
                <div className="details-line" key={k}>
                  <Label
                    content={k}
                    size="mini"
                    type="simple"
                    theme={props.theme}
                  />
                  <input
                    onFocus={e => e.target.select()}
                    value={point.parameters[k]}
                    readOnly
                  />
                </div>
              ))}
            </div>
            <div className="details-pm-container">
              <Label
                className="details-subtitle"
                content="Metrics"
                size="tiny"
                type="important"
                theme={props.theme}
              />
              {Object.keys(point.results).map(k => (
                <div className="details-line" key={k}>
                  <Label
                    content={k}
                    size="mini"
                    type="simple"
                    theme={props.theme}
                  />
                  <input
                    onFocus={e => e.target.select()}
                    value={point.results[k]}
                    readOnly
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Label
            content="Please click on a point to display infos here."
            size="tiny"
            type="simple"
            theme={props.theme}
          />
        )}
      </div>
    </StyledDetails>
  );
}

Details.propTypes = {
  theme: PropTypes.object,
  selectedPoint: PropTypes.number.isRequired,
  trials: PropTypes.array.isRequired,
};

Details.defaultProps = {
  theme,
};

export default Details;
