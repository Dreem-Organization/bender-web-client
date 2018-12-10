export default class Eyes {
  create() {
    this.c = document.getElementById('bender-eyes');
    this.head = document.getElementById('head');
    if (this.c) {
      this.ctx = this.c.getContext('2d');
      this.centerX = this.c.width / 2;
      this.centerY = this.c.height / 2;
      this.radius = 100;
      this.radiusEye = 10;
      this.faceCenterX = this.centerX;
      this.faceCenterY = this.c.height - 20;
      this.radiusEyeIn = 10;
      this.eyeYPosition = this.faceCenterY - 5;
      this.reyedx = this.faceCenterX + this.radiusEyeIn / 2 + 35;
      this.reyedy = this.eyeYPosition;
      this.leyedx = this.faceCenterX - this.radiusEyeIn / 2 - 35;
      this.leyedy = this.eyeYPosition;
      this.eyesgap = 15;
      this.draweyes(this.leyedx, this.leyedy, this.reyedx, this.reyedy);
    }
  }

  draweyes(lEyeX, lEyeY, rEyeX, rEyeY) {
    this.ctx.beginPath();
    this.ctx.arc(rEyeX, rEyeY, this.radiusEyeIn, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = '#5eb0ef';
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.arc(lEyeX, lEyeY, this.radiusEyeIn, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = '#5eb0ef';
    this.ctx.fill();
  }

  handleEyes(e) {
    this.ctx = this.c.getContext('2d');
    const mouseX = e.pageX - (this.centerX + 50);
    const mouseY = e.pageY - (this.head.clientHeight - 20);
    const ratioX = Math.abs(mouseX) / (Math.abs(mouseX) + Math.abs(mouseY));
    const ratioY = Math.abs(mouseY) / (Math.abs(mouseX) + Math.abs(mouseY));
    let reyedxafter = 0;
    let reyedyafter = 0;
    let leyedxafter = 0;
    let leyedyafter = 0;
    if (mouseX > 0) {
      reyedxafter = this.reyedx + ratioX * this.eyesgap;
    } else {
      reyedxafter = this.reyedx - ratioX * this.eyesgap;
    }
    if (mouseY > 0) {
      reyedyafter = this.reyedy + ratioY * this.eyesgap;
    } else {
      reyedyafter = this.reyedy - ratioY * this.eyesgap;
    }
    if (mouseX > 0) {
      leyedxafter = this.leyedx + ratioX * this.eyesgap;
    } else {
      leyedxafter = this.leyedx - ratioX * this.eyesgap;
    }
    if (mouseY > 0) {
      leyedyafter = this.leyedy + ratioY * this.eyesgap;
    } else {
      leyedyafter = this.leyedy - ratioY * this.eyesgap;
    }
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);
    this.draweyes(leyedxafter, leyedyafter, reyedxafter, reyedyafter);
  }
}
