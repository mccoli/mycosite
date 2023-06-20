var canvas;

// initial points
var x = 0.01;
var y = 0;
var z = 0;

// common constants
const o = 10;
const p = 28;
const b = 8.0/3.0

// custom vector object
function Vector(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}

// creating array for vectors
var points = [];

function setup() {
    canvas = createCanvas(650, 600, WEBGL);
    canvas.parent('lorenz-container');
    console.log("lorenz is set up.");
}

function draw() {
    background(0); 
    //stroke(255);
    strokeWeight(2);
    noFill();
    // DRAWING LORENZ
    // timestep
    let dt = 0.01;

    // colour values
    var r = 20;
    var g = 50;
    var b = 20;

    // lorenz equation
    let dxL = (o * (y - x)) * dt;
    let dy = (x * (p - z) - y) * dt;
    let dz = (x * y - b * z) * dt;
    x = x + dxL;
    y = y + dy;
    z = z + dz;
    
    var vector = new Vector(x, y, z);
    points.push(vector)

    push();
    beginShape();    
    scale(5);
    
    for (var i = 0; i < points.length; i++) {
        vertex(points[i].x, points[i].y, points[i].z);
        r += 0.5;
        g += 0.5;
        b += 0.5;
        stroke(r, g, b);
    }

    endShape();
    pop();   
}