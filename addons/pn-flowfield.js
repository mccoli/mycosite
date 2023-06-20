var canvas;

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Particle {
    // to instantiate a particle
    constructor(start, maxspeed) {
        this.posx = start.x;
        this.posy = start.y
        this.vel = new Vector(start.x, start.y);
        this.acc = new Vector(0, 0);
        this.previousPos = new Vector(start.x, start.y);
        this.maxSpeed = maxspeed;
    }

    // methods
    run() {
        this.update();
        // this.edges();
        this.show();
    }

    update() {
        this.posx += this.vel.x;
        this.posy += this.vel.y;
        Math.max(this.vel, this.maxSpeed);
        this.vel += this.acc;
        this.acc = this.acc*0;
    }

    applyForce(force) {
        this.acc += force;
    }

    show() {
        stroke(255, 50);
        strokeWeight(1);
        // line() equivalent
        // beginPath();
        // moveTo();
        // lineTo();

        line(this.posx, this.posy, this.previousPos.x, this.previousPos.y);
        this.updatePreviousPos();
    }

    // edges() {
    //     if (this.pos.x > canvas.width) {
    //         this.pos.x = 0;
    //         this.updatePreviousPos();
    //     }
    //     if (this.pos.x < 0) {
    //         this.pos.x = canvas.width;    
    //         this.updatePreviousPos();
    //     }
    //     if (this.pos.y > canvas.height) {
    //         this.pos.y = 0;
    //         this.updatePreviousPos();
    //     }
    //     if (this.pos.y < 0) {
    //         this.pos.y = canvas.height;
    //         this.updatePreviousPos();
    //     }
    // }

    updatePreviousPos() {
        this.previousPos.x = this.posx;
        this.previousPos.y = this.posy;
    }

    follow(flowfield) {
        let x = Math.floor(this.posx / flowfield.scl);
        let y = Math.floor(this.posy / flowfield.scl);
        let index = x + y * flowfield.cols;

        let force = flowfield.vectors[index];
        this.applyForce(force);
    }
}

class FlowField {
    // instantiated with resolution options
    constructor(res) {
        this.angles = [];
        this.vectors = [];
        this.cols = Math.floor(canvas.width / res) + 1;
        this.rows = Math.floor(canvas.height / res) + 1;
        this.inc = 0.1;
        this.zoff = 0;
        this.scl = res;

        // this.vectors = new Vector(this.cols, this.rows);
        
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                let index = x + y * this.cols;
                let angle = noise(x * this.inc, y * this.inc, this.zoff) * TWO_PI * 4;
                this.angles[index] = angle;
                let v = p5.Vector.fromAngle(angle);
                v.setMag(5);
                this.vectors.push(v);
            }
        }
    }

    // methods
    update() {
        let xoff = 0;
        for (let y = 0; y < this.rows; y++) {
            let yoff = 0;
            for (let x = 0; x < this.cols; x++) {
                let index = x + y * this.cols;
                let angle = noise(xoff, yoff, this.zoff) * TWO_PI * 4;
                this.angles[index] = angle;

                xoff += this.inc;
            }
            yoff += this.inc;
        }
        this.zoff += 0.004;
    }

    display() {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
              let index = x + y * this.cols;
            //   let v = p5.Vector(this.vectors[index]);
              let angle = this.angles[index];
      
              stroke(50, 200, 90, 100);
              strokeWeight(1);
              push();
              translate(x * this.scl, y * this.scl);
              //rotate(v.heading());
              rotate(angle);
              line(0, 0, this.scl, 0);
              pop();
            }
        }
    }
}

var flowfield;
var particles = [];

function setup() {
    canvas = createCanvas(400, 400);
    canvas.parent("flow-container");
    frameRate(30);

    flowfield = new FlowField(30);
    flowfield.update();

    // ! i can comment this out and nothing changes
    // for (let i = 0; i < 200; i++) {
    //     var start = new Vector(noise(canvas.width), noise(canvas.height));
    //     particles.push(new Particle(start, random(2, 8)));
    // }
    console.log('pn-flowfield setup successful.');

    // console.log(start.x, start.y);
}

function draw() {
    background(0);
    flowfield.update();
    flowfield.display();

    // ! i can comment this out and nothing changes
    // for(var p = 0; p < particles.length; p++) {
    //     particles[p].follow(flowfield);
    //     particles[p].run();
    // }
}