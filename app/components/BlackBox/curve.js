function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

class Line {
  constructor(centerY, centerX) {
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
    let str = '<path d="';
    this.points.forEach((p, i) => {
      if (i === 0) {
        str += 'M';
      } else if (i === 1) {
        str += ' ';
      } else {
        str += ' ';
      }
      str += `${i * 10} ${p}`;
    });
    str += '" fill="none" stroke="#108ee9" stroke-width="2px">';
    return str;
  }
}

export default class CubeWrapper {
  create() {
    const container = document.getElementById('line');
    const width = container.attributes.width.value;
    const height = container.attributes.height.value;
    const dx = width / 2;
    const dy = height / 2;
    const line = new Line(dy, dx);
    function loop() {
      container.innerHTML = line.render();
      setTimeout(() => {
        window.requestAnimationFrame(loop);
      }, 1000 / 40);
    }
    window.requestAnimationFrame(loop);
  }
}
