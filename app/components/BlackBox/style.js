import styled from 'styled-components';

const StyledBlackBox = styled.div`
  border-radius: 10px;
  border: 3px dashed ${props => props.theme.main};
  padding: 20px;
  margin: 20px 0;
  .black-box-head {
    text-align: center;
  }
  .black-box-anim {
    display: flex;
    flex-direction: column;
    .black-box-anim-sub {
      margin-top: 10px;
      display: flex;
      justify-content: center;
      flex-direction: row;
      align-items: center;
      .label {
        width: 150px;
        text-align: center;
      }
      .volume {
        margin: 0 5px;
      }
    }
  }
  .black-box-foot {
    margin-top: 20px;
    text-align: center;
  }
`;

export default StyledBlackBox;
