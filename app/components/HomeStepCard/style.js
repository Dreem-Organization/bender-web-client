import styled from 'styled-components';

const HomeStepCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .step-number {
    text-align: center;
    text-align: center;
    line-height: 1.5rem;
    font-weight: 700;
    width: 2rem;
    height: 2rem;
    color: ${props => props.theme.main};
    border: 3px solid ${props => props.theme.main};
    border-radius: 2rem;
    margin-bottom: 20px;
  }
  .home-step-card-container {
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.inverted};
    box-shadow: ${props => props.theme.secondaryShadow};
    border-radius: 10px;
    padding: 20px;
    max-width: 80%;
    .step-title {
      text-align: center;
    }
    .step-desc {
      text-align: justify;
    }
    .step-content-container {
      padding: 20px 0;
      display: flex;
      justify-content: center;
      .image {
        margin: 0 10px;
        &.grey {
          filter: grayscale(100%);
          opacity: 0.2;
        }
      }
    }
  }
`;

export default HomeStepCard;
