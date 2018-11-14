/* eslint-disable */
export default class ParticlesWrapper {
  create() {
    var canvas = document.getElementById('particles');
    var context = canvas.getContext('2d');
    canvas.width = 150;
    canvas.height = 150;

    // No longer setting velocites as they will be random
    // Set up object to contain particles and set some default values
    var particles = {},
      particleIndex = 0,
      settings = {
        density: 50,
        particleSize: 3,
        startingX: 0,
        startingY: canvas.height / 2,
        gravity: 0,
      };

    // Set up a function to create multiple particles
    function Particle() {
      // Establish starting positions and velocities
      this.x = settings.startingX;
      this.y = settings.startingY;

      // Determine original X-axis speed based on setting limitation
      this.vx = Math.random() * 7 + 4;
      this.vy = Math.random() * 2 - 1;

      // Add new particle to the index
      // Object used as it's simpler to manage that an array
      particleIndex += 1;
      particles[particleIndex] = this;
      this.id = particleIndex;
      this.life = 0;
      this.maxLife = 20;
    }

    // Some prototype methods for the particle's "draw" function
    Particle.prototype.draw = function() {
      this.x += this.vx;
      this.y += this.vy;

      // Adjust for gravity
      this.vy += settings.gravity;

      // Age the particle
      this.life++;

      // If Particle is old, it goes in the chamber for renewal
      if (this.life >= this.maxLife) {
        delete particles[this.id];
      }

      // Create the shapes
      context.clearRect(
        settings.leftWall,
        settings.groundLevel,
        canvas.width,
        canvas.height,
      );
      context.beginPath();
      context.fillStyle = `rgba(16, 142, 233,${1 - this.life / 30})`;
      context.arc(this.x, this.y, settings.particleSize, 0, Math.PI * 2, true);
      context.closePath();
      context.fill();
    };

    setInterval(() => {
      context.fillStyle = 'rgba(10,10,10,0.8)';
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the particles
      for (let i = 0; i < settings.density; i += 1) {
        if (Math.random() > 0.97) {
          // Introducing a random chance of creating a particle
          // corresponding to an chance of 1 per second,
          // per "density" value
          new Particle();
        }
      }

      for (var i in particles) {
        particles[i].draw();
      }
    }, 30);
  }
}
