import React from 'react';
import PropTypes from 'prop-types';
import { light as theme } from 'themeConfig';
import styled from 'styled-components';
import StyledInput from './style';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  .input-error {
    white-space: nowrap;
    position: absolute;
    z-index: 10000;
    top: -30px;
    left: 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .input-error-arrow {
      position: absolute;
      width: 0;
      height: 0;
      bottom: -5px;
      left: 10px;
      border-right: 5px solid transparent;
      border-top: 5px solid ${theme.negative};
      border-left: 5px solid transparent;
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
  const isError =
    props.meta.error &&
    ((props.meta.visited && !props.meta.active) || props.meta.submitFailed);
  return (
    <Wrapper className="input-wrapper">
      <StyledInput className="input" {...props} {...props.input} />
      {isError ? (
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
