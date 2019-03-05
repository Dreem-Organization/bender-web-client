import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import StyledCgu from './style';

function Cgu(props) {
  return (
    <StyledCgu className={props.isOpen ? 'cgu open' : 'cgu'} {...props}>
      <div className="cgu-text-container"></div>
      <Button onClick={props.onToggleCgu} content="CLOSE" />
    </StyledCgu>
  );
}

Cgu.propTypes = {
  onToggleCgu: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Cgu;
