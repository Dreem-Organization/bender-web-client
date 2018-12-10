import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { light as theme } from 'themeConfig';
import logo from 'images/white.png';
import Image from 'components/Image';
import Eyes from './eyes';

import StyledBenderEyes from './style';

export default class BenderEyes extends Component {
  componentDidMount() {
    this.e = new Eyes();
    this.e.create();
    this.listener = this.listener.bind(this);
    window.addEventListener('mousemove', this.listener);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.listener);
  }

  listener(event) {
    this.e.handleEyes(event);
  }

  render() {
    return (
      <StyledBenderEyes className="bender-eyes" {...this.props}>
        <Image src={logo} />
        <div className="eyes-container">
          <canvas id="bender-eyes" width={250} height={250} />
        </div>
      </StyledBenderEyes>
    );
  }
}

BenderEyes.displayName = 'BenderEyes';
BenderEyes.propTypes = {
  theme: PropTypes.object,
};
BenderEyes.defaultProps = {
  theme,
};
