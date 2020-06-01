function Box(x, y, w, h) {
    this.pos = createVector(x, y);
    this.width = w || 50;
    this.height = h || 50;
    this.display = function() {
      fill(80,150,255);
      stroke(255, 0, 0);
      rect(this.pos.x, this.pos.y, this.width, this.height);
    }
  }