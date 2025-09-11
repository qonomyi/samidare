let rains = [];
let angle;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#191922");
  stroke("#3e4057");

  for (let i = 0; i < width / 35; i++) {
    rains.push(new Rain());
  }
}

function draw() {
  background("#191922");

  for (let rain of rains) {
    rain.update();
    rain.draw();
  }
}

class Rain {
  constructor() {
    this.x = random(width);
    this.y = random(-120, -2000);
    this.size = random(1, 3);
    this.angle = radians(15);
  }

  update() {
    this.x -= sin(this.angle) * 15;
    this.y += cos(this.angle) * 15;

    if (this.y > height) {
      this.x = random(width * 2);
      this.y = random(-120, -2000);
    }
  }

  draw() {
    strokeWeight(this.size);
    line(
      this.x,
      this.y + cos(this.angle) * 120,
      this.x + sin(this.angle) * 120,
      this.y,
    );
  }
}
