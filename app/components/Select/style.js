import styled from 'styled-components';

const Select = styled.div`
  ${props => {
    if (props.label) {
      return `
        position: relative;
        border: 2px solid ${props.theme.main};
        border-radius: 5px;
        height: 1.4rem;
        min-width: 100px;
        &:hover {
          border: 2px solid ${props.theme.light};
          span {
            color: ${props.theme.light};
          }
        }
        span {
          background-color: ${props.theme.inverted};
          transition: 0.3s;
          padding: 0 4px;
          font-size: 0.5rem;
          font-family: ${props.theme.titleFont};
          color: ${props.theme.main};
          font-weight: 700;
          position: absolute;
          margin-left: 6px;
          top: -9px
        }
        label {
          position: absolute;
          display: flex;
          flex-direction: column;
          min-width: 100px;
          height: 1.4rem;
          &::after {
            position:absolute;
            top: 2px;
            right: 10px;
            content: '';
            width: 0.4rem;
            height: 0.4rem;
            border-top: 0.1rem solid ${props.theme.main};
            border-right: 0.1rem solid ${props.theme.main};
            -moz-transform: rotate(135deg);
            -webkit-transform: rotate(135deg);
            transform: rotate(135deg);
            transition: 0.1s;
          }
          &:hover {
            &::after {
              top: 5px;
              border-top: 0.1rem solid ${props.theme.light};
              border-right: 0.1rem solid ${props.theme.light};
            }
          }
          select::-ms-expand {
            display: none;
          }
          select {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            padding: 2px 3px;
            max-width: 80px;
            width: 100%;
            font-size: 0.8rem;
            font-family: ${props.theme.titleFont};
            color: ${props.theme.greyDark};
            &:hover {
              cursor: pointer;
            }
        }
`;
    }
    return `
      position: relative;
      display: flex;
      align-items: center;
      padding-top: 3px;
      height: 30px;
      font-size: 1.2rem;
      color: ${props.theme.greyDark};
      box-shadow: inset 0 -2px 0 0 ${props.theme.grey};
      transition: 0.1s;
      &::after {
        content: '';
        margin-top: -6px;
        width: 0.7rem;
        height: 0.7rem;
        border-top: 0.2rem solid ${props.theme.grey};
        border-right: 0.2rem solid ${props.theme.grey};
        -moz-transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
        transform: rotate(135deg);
        transition: 0.1s;
      }
      &:hover {
        box-shadow: inset 0 -2px 0 0 ${props.theme.light};
        cursor: pointer;
        &::after {
          margin-top: -1px;
          border-top: 0.2rem solid ${props.theme.light};
          border-right: 0.2rem solid ${props.theme.light};
        }
      }
      select::-ms-expand {
        display: none;
      }
      select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        min-width: 200px;
        font-family: ${props.theme.titleFont};
        &:hover {
          cursor: pointer;
        }
      }
    `;
  }};
`;

export default Select;
