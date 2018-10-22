import styled from 'styled-components';

const sizes = {
  1: '3.5em',
  2: '1.5em',
  3: '2em',
  4: '3em',
  5: '1.2em',
};

const Title = styled.h1`
  font-size: ${props => sizes[props.size]};
  font-family: ${props => props.theme.titleFont};
  margin: 0;
  padding: 0;
  color: ${props => props.theme.main};
`;

export default Title;
