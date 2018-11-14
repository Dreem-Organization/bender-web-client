/* eslint-disable */
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

  render(container, dx, dy, Project) {
    container.innerHTML = '';

    for (let i = 0, ii = this.faces.length; i < ii; i++) {
      let face = this.faces[i];
      let point = Project(face[0]);
      var str = `<path d="M${point.x + dx} ${-point.y + dy}`;
      for (let o = 1, oo = face.length; o < oo; o++) {
        point = Project(face[o]);
        str += ` L ${point.x + dx} ${-point.y + dy}`;
      }
      str += ` Z" fill="rgba(0, 0, 0, .9)" stroke="rgba(200, 200, 200, .1)">`;
      container.innerHTML += str;
    }
  }
}

export default class CubeWrapper {
  create() {
    const Project = vertice => new Point2(vertice.x, vertice.z);

    const Rotate = (vertice, center, theta, phi) => {
      var ct = Math.cos(theta),
        st = Math.sin(theta),
        cp = Math.cos(phi),
        sp = Math.sin(phi),
        x = vertice.x - center.x,
        y = vertice.y - center.y,
        z = vertice.z - center.z;

      vertice.x = ct * x - st * cp * y + st * sp * z + center.x;
      vertice.y = st * x + ct * cp * y - ct * sp * z + center.y;
      vertice.z = sp * y + cp * z + center.z;
    };

    const container = document.getElementById('cube');
    const width = container.attributes.width.value;
    const height = container.attributes.height.value;
    const dx = width / 2;
    const dy = height / 2;
    const center = new Point3(0, dy, 0);
    const cube = new Cube(center, dy);
    const mouse = {
      down: false,
      x: 0,
      y: 0,
    };

    const Tick = () => {
      for (var i = 0, ii = 8; i < ii; i++) {
        Rotate(cube.vertices[i], center, Math.PI / 270, Math.PI / 450);
      }

      cube.render(container, dx, dy, Project);

      !mouse.down ? requestAnimationFrame(Tick) : null;
    };

    cube.render(container, dx, dy, Project);

    container.addEventListener('mousedown', e => {
      mouse.down = true;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    container.addEventListener('mousemove', e => {
      if (mouse.down) {
        var theta = ((e.clientX - mouse.x) * Math.PI) / 360;
        var phi = ((e.clientY - mouse.y) * Math.PI) / 180;

        for (var i = 0, ii = 8; i < ii; i++) {
          Rotate(cube.vertices[i], center, theta, phi);
        }

        mouse.x = e.clientX;
        mouse.y = e.clientY;

        cube.render(container, dx, dy, Project);
      }
    });
    container.addEventListener('mouseup', e => {
      setTimeout(() => {
        mouse.down = false;
        requestAnimationFrame(Tick);
      }, 200);
    });

    requestAnimationFrame(Tick);
  }
}
