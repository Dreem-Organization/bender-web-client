import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';
import Label from 'components/Label';
import { light as theme } from 'themeConfig';
import StyledDetails from './style';

function Details(props) {
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
        {props.selectedPoint ? (
          <div className="details-head-under">
            <Label
              content={`Algo: ${props.selectedPoint.algo_name}`}
              size="mini"
              theme={props.theme}
            />
            <Label
              content={`Owner: ${props.selectedPoint.owner}`}
              size="mini"
              theme={props.theme}
            />
            {props.selectedPoint.comment ? (
              <Label
                content={`Comment: ${props.selectedPoint.comment}`}
                size="mini"
                theme={props.theme}
              />
            ) : (
              ''
            )}
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="details-body">
        {props.selectedPoint ? (
          <div className="details-body-sub">
            <div className="details-pm-container">
              <Label
                className="details-subtitle"
                content="Parameters"
                size="tiny"
                type="important"
                theme={props.theme}
              />
              {Object.keys(props.selectedPoint.parameters).map(k => (
                <div className="details-line" key={k}>
                  <Label
                    content={k}
                    size="mini"
                    type="simple"
                    theme={props.theme}
                  />
                  <input
                    onFocus={e => e.target.select()}
                    value={props.selectedPoint.parameters[k]}
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
              {Object.keys(props.selectedPoint.results).map(k => (
                <div className="details-line" key={k}>
                  <Label
                    content={k}
                    size="mini"
                    type="simple"
                    theme={props.theme}
                  />
                  <input
                    onFocus={e => e.target.select()}
                    value={props.selectedPoint.results[k]}
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
  selectedPoint: PropTypes.object,
  trials: PropTypes.array.isRequired,
};

Details.defaultProps = {
  theme,
};

export default Details;
