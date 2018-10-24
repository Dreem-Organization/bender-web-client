import React from 'react';
import PropTypes from 'prop-types';
import theme from 'themeConfig';
import styled from 'styled-components';
import StyledInput from './style';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  .input-error {
    width: 200px;
    position: absolute;
    z-index: 10000;
    right: -200px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .input-error-arrow {
      width: 0;
      height: 0;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-right: 5px solid ${theme.negative};
    }
    span {
      font-size: 0.7rem;
      border-radius: 3px;
      padding: 5px;
      background-color: ${theme.negative};
      color: ${theme.inverted};
    }
  }
`;

function Input(props) {
  return (
    <Wrapper className="input-wrapper">
      <StyledInput className="input" {...props} {...props.input} />
      {props.meta.error && props.meta.visited && !props.meta.active ? (
        <div className="input-error">
          <div className="input-error-arrow" />
          <span>{props.meta.error}</span>
        </div>
      ) : (
        ''
      )}
    </Wrapper>
  );
}

Input.propTypes = {
  theme: PropTypes.object,
  input: PropTypes.object,
  meta: PropTypes.object,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  theme,
};

export default Input;
