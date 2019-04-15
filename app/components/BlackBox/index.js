import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { light as theme } from 'themeConfig';
import Label from 'components/Label';
import Volume from './volume';
import StyledBlackBox from './style';
import CubeComponent from './cube';
import ParticlesWrapper from './particles';
import CurveComponent from './curve';

export default class BlackBox extends Component {
  constructor(props) {
    super(props);
    this.pw = null;
  }
  componentDidMount() {
    this.canvas.width = 150;
    this.canvas.height = 150;
    this.pw = new ParticlesWrapper(this.canvas);
    this.pw.loop();
  }

  componentWillUnmount() {
    this.pw.stop();
    this.pw = null;
  }

  render() {
    return (
      <StyledBlackBox className="black-box" {...this.props}>
        <div className="black-box-head">
          <Label content="Here's your Blackbox" size="big" type="important" />
        </div>
        <div className="black-box-anim">
          <div className="black-box-anim-sub">
            <canvas ref={e => (this.canvas = e)} id="particles" />
            <CubeComponent width={150} height={150} />
            <CurveComponent width={150} height={150} />
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
