function Person() {
    this.height = 85;
    this.width = 20;
    this.pos = createVector(this.height - 35, height);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.applyForce = function(force) {
      this.acc.add(force);
    }
  
    this.update = function() {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.set(0, 0);
    }
  
    this.display = function() {
      fill(255);
      stroke(255);
      rect(this.pos.x,this.pos.y-(this.height - 35), this.width, (this.height - 35));
      ellipse(this.pos.x+10,this.pos.y-70, this.width + 5, this.width+5);
    }
  
    this.edges = function() {
      if (this.pos.y > height) {
        this.vel.y *= -0.25;
        this.pos.y = height;
      }
      else if(this.pos.y < this.height){
        this.vel.y *= -0.25;
        this.pos.y = this.height;
      }
    }
  }