import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { light as theme } from 'themeConfig';
import logo from 'images/white.png';
import Image from 'components/Image';

import StyledBenderEyes from './style';

export default class BenderEyes extends Component {
  componentDidMount() {}

  render() {
    return (
      <StyledBenderEyes className="bender-eyes" {...this.props}>
        <Image src={logo} />
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
