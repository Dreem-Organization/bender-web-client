import styled from 'styled-components';

const Button = styled.button`
  ${props => {
    if (props.type === 'round') {
      return `
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      i {
        font-size: 1.3rem;
      }
      color: ${props.color ? props.theme[props.color] : props.theme.main};
      &:hover {
        transform: scale(1.1);
        cursor: pointer;
      }
`;
    }
    return `
    height: 30px;
    margin: 0;
    padding: 0;
    color: ${props.theme.main};
    box-shadow: inset 0 -3px 0 0 ${props.theme.main};
    transition: 0.2s;
    &:hover {
      box-shadow: inset 0 -30px 0 0 ${props.theme.main};
      color: ${props.theme.inverted};
      cursor: pointer;
    }
    `;
  }};
`;

export default Button;
