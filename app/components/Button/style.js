import styled, { css } from 'styled-components';

const roundAfter = css`
  transition: 0.2s;
  opacity: 0;
  content: "${props => props.content}";
  font-size: 0.1em !important;
  position: absolute;
  top: -10px;
`;

const round = css`
  position: relative;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  justify-content: center;
  i {
    font-size: 1.3rem;
  }
  color: ${props =>
    props.color ? props.theme[props.color] : props.theme.main};
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
    ${props => (props.content ? `&::after {opacity: 1;}` : '')};
  }
  &::after {
    ${props => (props.content ? roundAfter : '')};
  }
`;

const normal = css`
  height: 30px;
  margin: 0;
  padding: 0;
  color: ${props => props.theme.main};
  box-shadow: inset 0 -3px 0 0 ${props => props.theme.main};
  transition: 0.2s;
  &:hover {
    box-shadow: inset 0 -30px 0 0 ${props => props.theme.main};
    color: ${props => props.theme.inverted};
    cursor: pointer;
  }
`;

const Button = styled.button`
  ${props => {
    if (props.type === 'round') {
      return round;
    }
    return normal;
  }};
`;

export default Button;
