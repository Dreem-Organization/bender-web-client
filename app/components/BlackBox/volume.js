/* eslint-disable no-restricted-properties */
import React from 'react';

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export default class Volume extends React.Component {
  constructor(props) {
    super(props);
    this.volume = {
      centerX: 25.749,
      centerY: 34.249,
      ray: 16,
      pos: 25.749 - 16,
      objective: 25.749 - 16,
      speed: 0.5,
    };
    this.circle = null;
    this.line = null;
    this.animationID = null;
  }

  componentDidMount() {
    this.animationID = requestAnimationFrame(this.animate);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.animationID);
  }

  rand = () => {
    const v = this.volume;
    return getRndInteger(v.centerX - v.ray + 1, v.centerX + v.ray - 1);
  };

  calc(x) {
    const v = this.volume;
    const y =
      Math.sqrt(Math.pow(v.ray, 2) - Math.pow(v.centerX - x.toFixed(3), 2)) +
      v.centerY;
    return v.centerY - (y - v.centerY);
  }

  animate = () => {
    const v = this.volume;
    if (v.pos < v.objective) {
      v.pos = v.pos + v.speed > v.objective ? v.objective : v.pos + v.speed;
    } else if (v.pos > v.objective) {
      v.pos = v.pos - v.speed < v.objective ? v.objective : v.pos - v.speed;
    } else {
      v.objective = this.rand();
    }
    if (this.circle) {
      this.circle.setAttribute('cx', v.centerX);
      this.circle.setAttribute('cy', v.centerY);
      this.circle.setAttribute('r', v.ray);
    }
    if (this.line) {
      this.line.setAttribute('x1', v.pos);
      this.line.setAttribute('y1', this.calc(v.pos));
      this.line.setAttribute('x2', v.centerX);
      this.line.setAttribute('y2', v.centerY);
    }
    this.animationID = requestAnimationFrame(this.animate);
  };

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
            ref={e => (this.circle = e)}
            fill="#C7CAC7"
            stroke="#949493"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
          <line
            ref={e => (this.line = e)}
            fill="none"
            stroke="#949493"
            strokeWidth="2"
            strokeLinecap="round"
            strokeMiterlimit="10"
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
