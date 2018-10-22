import React from 'react';
import PropTypes from 'prop-types';
import Image from 'components/Image';
import github from 'images/github.png';
import theme from 'themeConfig';
import GitHubLogin from 'react-github-login';
import StyledGithubButton from './style';

const GithubButton = props => (
  <StyledGithubButton className="GithubButton">
    <Image src={github} />
    <GitHubLogin
      redirectUri="http://127.0.0.1:3000/github"
      clientId="94f80adf382cc11db60d"
      buttonText=""
      {...props}
    />
  </StyledGithubButton>
);

GithubButton.propTypes = {
  theme: PropTypes.object,
  size: PropTypes.number,
};

GithubButton.defaultProps = {
  theme,
};

export default GithubButton;
