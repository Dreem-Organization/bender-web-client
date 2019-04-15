import React from 'react';
import PropTypes from 'prop-types';

class Point2 {
  constructor(x, y) {
    this.x = typeof x === 'number' ? x : 0;
    this.y = typeof y === 'number' ? y : 0;
  }
}

class Point3 extends Point2 {
  constructor(x, y, z) {
    super(x, y);
    this.z = typeof z === 'number' ? z : 0;
  }
}

class Cube {
  constructor(center, size) {
    const d = size / 2;

    this.vertices = [
      new Point3(center.x - d, center.y - d, center.z + d),
      new Point3(center.x - d, center.y - d, center.z - d),
      new Point3(center.x + d, center.y - d, center.z - d),
      new Point3(center.x + d, center.y - d, center.z + d),
      new Point3(center.x + d, center.y + d, center.z + d),
      new Point3(center.x + d, center.y + d, center.z - d),
      new Point3(center.x - d, center.y + d, center.z - d),
      new Point3(center.x - d, center.y + d, center.z + d),
    ];

    this.faces = [
      [this.vertices[0], this.vertices[1], this.vertices[2], this.vertices[3]],
      [this.vertices[3], this.vertices[2], this.vertices[5], this.vertices[4]],
      [this.vertices[4], this.vertices[5], this.vertices[6], this.vertices[7]],
      [this.vertices[7], this.vertices[6], this.vertices[1], this.vertices[0]],
      [this.vertices[7], this.vertices[0], this.vertices[3], this.vertices[4]],
      [this.vertices[1], this.vertices[6], this.vertices[5], this.vertices[2]],
    ];
  }

  renderPath(index, dx, dy) {
    const face = this.faces[index];
    const d = [];
    let point = proj(face[0]);
    d.push(`M${point.x + dx} ${-point.y + dy}`);
    for (let i = 1; i < face.length; i++) {
      point = proj(face[i]);
      d.push(`L ${point.x + dx} ${-point.y + dy}`);
    }
    d.push('Z');
    return d.join(' ');
  }
}

function proj(vertice) {
  return new Point2(vertice.x, vertice.z);
}

function rot(vertice, center, theta, phi) {
  const ct = Math.cos(theta),
    st = Math.sin(theta),
    cp = Math.cos(phi),
    sp = Math.sin(phi),
    x = vertice.x - center.x,
    y = vertice.y - center.y,
    z = vertice.z - center.z;
  vertice.x = ct * x - st * cp * y + st * sp * z + center.x;
  vertice.y = st * x + ct * cp * y - ct * sp * z + center.y;
  vertice.z = sp * y + cp * z + center.z;
}

export default class CubeComponent extends React.Component {
  constructor(props) {
    super(props);
    const dy = props.height / 2;
    this.center = new Point3(0, dy, 0);
    this.cube = new Cube(this.center, dy);
    this.mouse = {
      down: false,
      x: 0,
      y: 0,
    };
    this.paths = [];
    this.renderScheduled = false;
    this.tickID = null;
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
      const dy = this.props.height / 2;
      this.center = new Point3(0, dy, 0);
      this.cube = new Cube(this.center, dy);
      this.renderPaths();
    }
  }

  onMouseDown = e => {
    this.mouse.down = true;
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  };

  onMouseMove = e => {
    if (!this.mouse.down) {
      return;
    }
    const theta = ((e.clientX - this.mouse.x) * Math.PI) / 360;
    const phi = ((e.clientY - this.mouse.y) * Math.PI) / 180;

    for (let i = 0; i < 8; i++) {
      rot(this.cube.vertices[i], this.center, theta, phi);
    }

    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
    this.renderPaths();
  };

  onMouseUp = () => {
    setTimeout(() => {
      this.mouse.down = false;
      this.tickID = requestAnimationFrame(this.tick);
    }, 200);
  };

  tick = () => {
    for (let i = 0; i < 8; i++) {
      rot(this.cube.vertices[i], this.center, Math.PI / 270, Math.PI / 450);
    }
    this.doRenderPaths();
    if (!this.mouse.down) {
      this.tickID = requestAnimationFrame(this.tick);
    }
  };

  doRenderPaths = () => {
    const dx = this.props.width / 2;
    const dy = this.props.height / 2;
    for (let i = 0; i < this.paths.length; i++) {
      const path = this.paths[i];
      if (!path) {
        break;
      }
      path.setAttribute('d', this.cube.renderPath(i, dx, dy));
    }
  };

  renderPaths = () => {
    if (!this.renderScheduled) {
      requestAnimationFrame(() => {
        this.doRenderPaths();
        this.renderScheduled = false;
      });
      this.renderScheduled = true;
    }
  };

  render() {
    const pathFill = 'rgba(0, 0, 0, .9)';
    const pathStroke = 'rgba(200, 200, 200, .1)';
    return (
      <svg
        id="cube"
        view-box="0 0 800 600"
        width={this.props.width}
        height={this.props.height}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
      >
        <path
          ref={e => (this.paths[0] = e)}
          fill={pathFill}
          stroke={pathStroke}
        />
        <path
          ref={e => (this.paths[1] = e)}
          fill={pathFill}
          stroke={pathStroke}
        />
        <path
          ref={e => (this.paths[2] = e)}
          fill={pathFill}
          stroke={pathStroke}
        />
        <path
          ref={e => (this.paths[3] = e)}
          fill={pathFill}
          stroke={pathStroke}
        />
        <path
          ref={e => (this.paths[4] = e)}
          fill={pathFill}
          stroke={pathStroke}
        />
        <path
          ref={e => (this.paths[5] = e)}
          fill={pathFill}
          stroke={pathStroke}
        />
      </svg>
    );
  }
}

CubeComponent.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};
