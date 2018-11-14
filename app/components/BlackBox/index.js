import React, { Component } from 'react';
import PropTypes from 'prop-types';
import theme from 'themeConfig';
import Label from 'components/Label';
import Volume from './volume';
import StyledBlackBox from './style';
import CubeWrapper from './cube';
import ParticlesWrapper from './particles';
import LineWrapper from './curve';

export default class BlackBox extends Component {
  componentDidMount() {
    const c = new CubeWrapper();
    const p = new ParticlesWrapper();
    const l = new LineWrapper();
    c.create();
    p.create();
    l.create();
  }

  render() {
    return (
      <StyledBlackBox className="black-box" {...this.props}>
        <div className="black-box-head">
          <Label content="Here's your Blackbox" size="big" type="important" />
        </div>
        <div className="black-box-anim">
          <div className="black-box-anim-sub">
            <canvas id="particles" />
            <svg id="cube" view-box="0 0 800 600" width="150" height="150" />
            <svg id="line" width="150" height="150" />
          </div>
          <div className="black-box-anim-sub">
            <Label content="INPUT DATA" size="mini" />
            <Volume />
            <Volume />
            <Volume />
            <Label content="PERFORMANCES" size="mini" />
          </div>
          <div className="black-box-anim-sub">
            <Label content="HYPER PARAMETERS" size="mini" />
          </div>
        </div>
        <div className="black-box-foot">
          <Label
            content="Bender helps you maximise the performances of your algorithm by finding the best Hyper-Parameters set for it"
            size="sandard"
          />
        </div>
      </StyledBlackBox>
    );
  }
}

BlackBox.displayName = 'BlackBox';
BlackBox.propTypes = {
  theme: PropTypes.object,
};
BlackBox.defaultProps = {
  theme,
};
