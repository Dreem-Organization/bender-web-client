import styled from 'styled-components';

const sizes = {
  mini: '0.7em',
  tiny: '0.85em',
  normal: '1em',
  big: '1.4em',
};

const Label = styled.span`
  font-size: ${props => sizes[props.size]};
  margin: 0;
  padding: 0;
  color: ${props => props.theme.greyDark};
  ${props => {
    switch (props.type) {
      case 'link':
        return 'text-decoration: underline;';
      case 'simple':
        return "font-family: 'Roboto', sans-serif;";
      case 'important':
        return `
          color: ${props.theme.main};
          font-weight: 700;
`;
      default:
        return '';
    }
  }};
`;

export default Label;
