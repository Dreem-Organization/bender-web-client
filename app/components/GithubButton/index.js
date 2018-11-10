import React from 'react';
import PropTypes from 'prop-types';
import Image from 'components/Image';
import github from 'images/github.png';
import theme from 'themeConfig';
import StyledGithubButton from './style';

const GithubButton = props => (
  <StyledGithubButton
    className="GithubButton"
    onClick={() =>
      window.location.replace(
        'https://github.com/login/oauth/authorize?redirect_uri=https://bender.dreem.com/socialLogin&client_id=94f80adf382cc11db60d',
      )
    }
    {...props}
  >
    <Image src={github} />
  </StyledGithubButton>
);

GithubButton.propTypes = {
  theme: PropTypes.object,
};

GithubButton.defaultProps = {
  theme,
};

export default GithubButton;
