import styled from 'styled-components';

const Image = styled.img`
  background-color: ${props => (props.src ? 'tansparent' : props.theme.main)};
  width: ${props => props.width};
  height: ${props => props.height};
`;

export default Image;
