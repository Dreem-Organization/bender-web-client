import React from 'react';
import PropTypes from 'prop-types';
import Title from 'components/Title';
import Image from 'components/Image';
import Button from 'components/Button';
import styled from 'styled-components';
import bender from 'images/nope.png';

const NotFoundView = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .image {
    width: 300px;
    height: auto;
  }
  .button {
    padding: 0 20px;
  }
`;

/* eslint-disable react/prefer-stateless-function */
export default class NotFound extends React.PureComponent {
  render() {
    return (
      <NotFoundView>
        <Image src={bender} />
        <Title>Pretty much nothing here...</Title>
        <Button
          content="GO BACK"
          onClick={() => this.props.history.push('/')}
        />
      </NotFoundView>
    );
  }
}

NotFound.displayName = 'NotFound';
NotFound.propTypes = {
  history: PropTypes.object,
};
