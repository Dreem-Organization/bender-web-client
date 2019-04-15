class Particle {
  constructor(index, settings) {
    // Establish starting positions and velocities
    this.x = settings.startingX;
    this.y = settings.startingY;
    this.settings = settings;

    // Determine original X-axis speed based on setting limitation
    this.vx = Math.random() * 7 + 4;
    this.vy = Math.random() * 2 - 1;

    this.id = index;
    this.life = 0;
    this.maxLife = 20;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    // Adjust for gravity
    this.vy += this.settings.gravity;

    // Age the particle
    this.life++;
  }

  draw(ctx, cwidth, cheight) {
    this.move();

    // Create the shapes
    ctx.clearRect(
      this.settings.leftWall,
      this.settings.groundLevel,
      cwidth,
      cheight,
    );
    ctx.beginPath();
    ctx.fillStyle = `rgba(16, 142, 233,${1 - this.life / 30})`;
    ctx.arc(this.x, this.y, this.settings.particleSize, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }
}
export default class ParticlesWrapper {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    // No longer setting velocites as they will be random
    // Set up object to contain particles and set some default values
    this.particles = new Map();
    this.particleIndex = 0;
    this.settings = {
      density: 50,
      particleSize: 3,
      startingX: 0,
      startingY: this.height / 2,
      gravity: 0,
    };
    this.renderID = null;
  }

  doRender() {
    this.ctx.fillStyle = 'rgba(10,10,10,0.8)';
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw the particles
    for (let i = 0; i < this.settings.density; i += 1) {
      if (Math.random() > 0.97) {
        // Introducing a random chance of creating a particle
        // corresponding to an chance of 1 per second,
        // per "density" value
        const id = this.particleIndex;
        const p = new Particle(id, this.settings);
        this.particles.set(id, p);
        this.particleIndex += 1;
      }
    }
    this.particles.forEach(p => {
      p.draw(this.ctx, this.width, this.height);
      if (p.life >= p.maxLife) {
        this.particles.delete(p.id);
      }
    });
  }

  loop() {
    this.renderID = requestAnimationFrame(() => {
      this.doRender();
      this.loop();
    });
  }

  stop() {
    cancelAnimationFrame(this.renderID);
  }
}
