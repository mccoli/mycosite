//
//  Challenge #3: Flow Simulation
//
//
//  Idea: Daniel Shiffman - The Coding Train
//  http://shiffman.net/
//
// Author: Hirnschall Sebastian
// https://hirnschall.net
// Date: 14.Jul.2020
// Time: ~20min


var canvasHeight = 600;
var canvasWidth = 600;

var particles = [];
var particleIndex = 0;
var maxParticles = 300;

// affects how much neighbouring vectors influence each other...lower for less influence, higher for more
var flow = 100;

// lower number means more vector paths for the particles to take
var res = 10;
var particleSpeed = 4;

function setup() {
    canvas = createCanvas(canvasWidth, canvasHeight);
    background(51);
    
    frameRate(30);
}


function draw(){
  background(51);
    if(particleIndex < maxParticles) 
        particles[particleIndex++] = new particle(canvasWidth + 10, random(canvasHeight));

        for(var i = 0; i < particleIndex; i++) {
            particles[i].update();
            particles[i].show();
        }
}

function particle(x, y) {
    this.x = x;
    this.y = y;
    this.v = [-1 , 0];
    this.a = [0 , 0];
    
    this.show = function () {
        fill(200);
        ellipse(this.x, this.y, 5, 5);
    }
    
    this.update = function() {
        this.v = [cos(noise(this.x/flow, this.y/flow) * TWO_PI), sin(noise(this.x/flow, this.y/flow) * TWO_PI)];
        this.x += this.v[0] * particleSpeed;
        this.y += this.v[1] * particleSpeed;
        
        // edge detection
        if(this.x < -10){
            this.x = canvasWidth + 10;
            this.y = random(canvasHeight);
        }
    }
}