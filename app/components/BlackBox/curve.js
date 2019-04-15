import React from 'react';
import PropTypes from 'prop-types';

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// FIXME: Should use d3-shape
class Line {
  constructor(centerX, centerY) {
    this.points = [
      centerY,
      centerY,
      centerY,
      centerY,
      centerY,
      centerY,
      centerY,
      centerY,
      centerY,
      centerY,
      centerY,
      centerY,
      centerY,
      centerY,
      centerY,
    ];
    this.centerX = centerX;
    this.centerY = centerY;
    this.target = centerY;
    this.newTarget();
  }

  newTarget() {
    const min = this.target - 40 < 0 ? 0 : this.target - 40;
    const max =
      this.target + 40 > this.centerY * 2 ? this.centerY * 2 : this.target + 40;
    this.target = getRndInteger(min, max);
  }

  move() {
    let newPoint = this.points[0];
    if (this.target > newPoint) {
      newPoint += 10;
      if (this.target < newPoint) {
        newPoint = this.target;
        this.newTarget();
      }
    } else if (this.target < newPoint) {
      newPoint -= 10;
      if (this.target > newPoint) {
        newPoint = this.target;
        this.newTarget();
      }
    } else {
      this.newTarget();
    }
    this.points.pop();
    this.points.unshift(newPoint);
  }

  render() {
    this.move();
    return this.points
      .map((p, i) => (i === 0 ? `M${i * 10} ${p}` : `${i * 10} ${p}`))
      .join(' ');
  }
}

export default class CurveComponent extends React.Component {
  constructor(props) {
    super(props);
    const dx = props.width / 2;
    const dy = props.height / 2;
    this.line = new Line(dx, dy);
    this.tickID = null;
    this.path = null;
  }

  componentDidMount() {
    this.tickID = requestAnimationFrame(this.tick);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.tickID);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.height !== this.props.height ||
      prevProps.width !== this.props.width
    ) {
      const dx = this.props.width / 2;
      const dy = this.props.height / 2;
      this.line = new Line(dx, dy);
    }
  }

  tick = () => {
    if (this.path) {
      this.path.setAttribute('d', this.line.render());
    }
    setTimeout(() => {
      this.tickID = requestAnimationFrame(this.tick);
    }, 1000 / 40);
  };

  render() {
    return (
      <svg id="line" width={this.props.width} height={this.props.height}>
        <path
          ref={e => (this.path = e)}
          fill="none"
          stroke="#108ee9"
          strokeWidth="2px"
        />
      </svg>
    );
  }
}

CurveComponent.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};
