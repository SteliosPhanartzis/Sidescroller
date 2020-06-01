function Enemy(x) {
    this.height = 85;
    this.width = 25;
    // this.bobHead;
    // this.down;
    this.pos = createVector(x, height);
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
      fill(50,150,100);
      stroke(255);
      rect(this.pos.x,this.pos.y-(this.height - 35), this.width, (this.height - 35));
      rect(this.pos.x - 2.5,this.pos.y - this.height, this.width + 5, this.width + 5);
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

    // this.animate = function() {
    //   if(this.down && this.bobHead > -15)
    //     this.bobHead-=1;
    //   else if(!down && this.bobHead < 15)
    //     this.bobHead+=1;
    //   else if(this.bobHead == 15 || this.bobHead == -15)
    //     this.down = !this.down;
    // }
  }