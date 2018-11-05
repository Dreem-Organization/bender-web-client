import styled from 'styled-components';

const Chart = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 150px;
  .chart-filters-container {
    min-height: 40px;
    display: flex;
    align-items: center;
    i {
      margin-right: 8px;
      color: ${props => props.theme.main};
      font-size: 1.1rem;
    }
    .chart-filters {
      display: flex;
      flex-direction: row;
      .select {
        margin-left: 10px;
      }
    }
  }
  .chart-container {
    position: relative;
    flex-grow: 1;
    .chart-sub-container {
      position: absolute;
      height: 100%;
      width: 100%;
      .chart-empty-container {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .chart-visualize-container {
    .chart-visualize-sub-container {
      min-height: 40px;
      display: flex;
      align-items: center;
      i {
        margin-right: 8px;
        color: ${props => props.theme.main};
        font-size: 1.1rem;
      }
      .select {
        margin-left: 10px;
      }
      .chart-checkboxes {
        display: flex;
        .checkbox {
          margin-left: 10px;
        }
      }
    }
  }
  .custom-tooltip {
    background: #fff;
    border-radius: 10px;
    padding: 10px;
    width: 400px;
    position: relative;
    box-shadow: ${props => props.theme.shadow};
    z-index: 30;
    .custom-tooltip-header {
      display: flex;
      justify-content: space-between;
      .custom-tooltip-title {
        text-transform: uppercase;
      }
      .time-ago {
        color: ${props => props.theme.greyDark};
        font-weight: bold;
      }
    }
    .custom-tooltip-sub-container {
      .custom-tooltip-data-list {
        display: flex;
        flex-direction: column;
        .data-table {
          margin-top: 5px;
          flex-direction: row;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          .left,
          .right {
            width: 50%;
            text-transform: uppercase;
            padding: 0 5px;
            margin: 0;
          }
          .left {
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
  .recharts-responsive-container {
    &:hover {
      cursor: pointer !important;
    }
  }
  .recharts-wrapper {
    height: auto !important;
  }
`;

export default Chart;
