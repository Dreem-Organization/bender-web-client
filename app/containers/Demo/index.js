import React from 'react';
import { PropTypes } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectStatus } from 'containers/App/selectors';
import reducer from 'containers/App/reducer';
import { socialLogin } from 'containers/App/actions';
import saga from 'containers/App/saga';
import Title from 'components/Title';
import Image from 'components/Image';
import Button from 'components/Button';
import bender from 'images/nope.png';
// import Plot from 'react-plotly.js';

const StyledDemo = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .graphs {
    margin-bottom: 40px;
  }
  .image {
    width: 300px;
    height: auto;
  }
`;

/* eslint-disable react/prefer-stateless-function */
export class Demo extends React.PureComponent {
  componentDidMount() {
    // this.loop(0);
  }

  render() {
    if (this.props.status === 'in') {
      return <Redirect to="/dashboard" />;
    }
    // const data1 = [
    //   {
    //     z: this.sourceData,
    //     type: 'surface',
    //     showscale: false,
    //     contours: {
    //       z: {
    //         show: true,
    //         usecolormap: true,
    //         highlightcolor: '#42f462',
    //         project: { z: true },
    //       },
    //     },
    //   },
    // ];

    // const data2 = [
    //   {
    //     z: this.state.progressiveData,
    //     type: 'surface',
    //     showscale: false,
    //     contours: {
    //       z: {
    //         show: true,
    //         usecolormap: true,
    //         highlightcolor: '#42f462',
    //         project: { z: true },
    //       },
    //     },
    //   },
    // ];

    // const layout = {
    //   autosize: false,
    //   width: 500,
    //   height: 500,
    //   showlegend: false,
    //   scene: { camera: { eye: { x: 1.87, y: 0.88, z: -0.64 } } },
    //   margin: {
    //     l: 65,
    //     r: 50,
    //     b: 65,
    //     t: 90,
    //   },
    // };

    // const options = {
    //   displayModeBar: false,
    // };

    return (
      <StyledDemo>
        {/* <div className="graphs">
          <Plot data={data1} layout={layout} config={options} />
          <Plot data={data2} layout={layout} config={options} />
        </div> */}
        <Image src={bender} />
        <Title>
          {
            "I'm working on a sexy demo just for you : just a little bit more patience..."
          }
        </Title>
        <Button
          content="GO BACK"
          onClick={() => this.props.history.push('/')}
        />
      </StyledDemo>
    );
  }
}

Demo.displayName = 'Demo';
Demo.propTypes = {
  status: PropTypes.string,
  history: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    socialLogin: data => dispatch(socialLogin(data)),
  };
}

const mapStateToProps = createStructuredSelector({
  status: makeSelectStatus(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'global', reducer });
const withSaga = injectSaga({ key: 'global', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Demo);
