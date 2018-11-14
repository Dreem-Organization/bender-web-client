/* eslint-disable no-restricted-properties */
import React from 'react';

export default class BlackBox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      centerX: 25.749,
      centerY: 34.249,
      ray: 16,
      pos: 25.749 - 16,
      objective: 25.749 - 16,
      speed: 0.5,
    };
    this.animate = this.animate.bind(this);
    this.rand = this.rand.bind(this);
    window.requestAnimationFrame(this.animate);
  }
  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  rand() {
    return this.getRndInteger(
      this.state.centerX - this.state.ray + 1,
      this.state.centerX + this.state.ray - 1,
    );
  }

  calc(x) {
    const y =
      Math.sqrt(
        Math.pow(this.state.ray, 2) -
          Math.pow(this.state.centerX - x.toFixed(3), 2),
      ) + this.state.centerY;
    return this.state.centerY - (y - this.state.centerY);
  }

  animate() {
    if (this.state.pos < this.state.objective) {
      this.setState({
        pos:
          this.state.pos + this.state.speed > this.state.objective
            ? this.state.objective
            : this.state.pos + this.state.speed,
      });
    } else if (this.state.pos > this.state.objective) {
      this.setState({
        pos:
          this.state.pos - this.state.speed < this.state.objective
            ? this.state.objective
            : this.state.pos - this.state.speed,
      });
    } else {
      this.setState({
        objective: this.rand(),
      });
    }
    window.requestAnimationFrame(this.animate);
  }

  render() {
    return (
      <div className="volume">
        <svg
          id="Capa_1"
          x="0px"
          y="0px"
          width="40"
          height="40"
          viewBox="0 0 51.497 51.497"
        >
          <circle
            fill="#C7CAC7"
            stroke="#949493"
            strokeWidth="2"
            strokeMiterlimit="10"
            cx={this.state.centerX}
            cy={this.state.centerY}
            r={this.state.ray}
          />
          <line
            fill="none"
            stroke="#949493"
            strokeWidth="2"
            strokeLinecap="round"
            strokeMiterlimit="10"
            x1={this.state.pos}
            y1={this.calc(this.state.pos)}
            x2={this.state.centerX}
            y2={this.state.centerY}
          />
          <line
            fill="none"
            stroke="#EFCE4A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeMiterlimit="10"
            x1="25.749"
            y1="1.249"
            x2="25.749"
            y2="7.249"
          />
          <line
            fill="none"
            stroke="#D75A4A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeMiterlimit="10"
            x1="50.497"
            y1="11.5"
            x2="46.255"
            y2="15.743"
          />
          <line
            fill="none"
            stroke="#659C35"
            strokeWidth="2"
            strokeLinecap="round"
            strokeMiterlimit="10"
            x1="5.243"
            y1="15.743"
            x2="1"
            y2="11.5"
          />
          <line
            fill="none"
            stroke="#ED8A19"
            strokeWidth="2"
            strokeLinecap="round"
            strokeMiterlimit="10"
            x1="34.807"
            y1="2.441"
            x2="33.254"
            y2="8.237"
          />
          <line
            fill="none"
            stroke="#A4E869"
            strokeWidth="2"
            strokeLinecap="round"
            strokeMiterlimit="10"
            x1="16.69"
            y1="2.441"
            x2="18.243"
            y2="8.237"
          />
          <line
            fill="none"
            stroke="#A4E869"
            strokeWidth="2"
            strokeLinecap="round"
            strokeMiterlimit="10"
            x1="18.243"
            y1="8.237"
            x2="16.69"
            y2="2.441"
          />
          <line
            fill="none"
            stroke="#DC691D"
            strokeWidth="2"
            strokeLinecap="round"
            strokeMiterlimit="10"
            x1="43.249"
            y1="5.938"
            x2="40.249"
            y2="11.134"
          />
          <line
            fill="none"
            stroke="#88C057"
            strokeWidth="2"
            strokeLinecap="round"
            strokeMiterlimit="10"
            x1="11.249"
            y1="11.134"
            x2="8.249"
            y2="5.938"
          />
        </svg>
      </div>
    );
  }
}
