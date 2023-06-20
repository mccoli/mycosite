var canvas;

// parameters
var a = 0.9;
var b = -0.6013;
var c = 2.0;
var d = 0.5;

// initial values
var x = -0.7;
var y = -0.6;
var z = 0.1;

// iterative values
var xnext = 0;
var ynext = 0;
var znext = 0;

// position values
var prevx = 0;
var prevy = 0;
var prevz = 0;

// creating array for vectors
var points = [];

// custom vector object
function Vector(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}

function setup() {
    canvas = createCanvas(650, 600, WEBGL);
    canvas.parent("tinker-container");
    console.log("tinkerbell is set up.")
}

function draw() {
    background(0); 

    push();
    beginShape();
    
    scale(100);
    //noFill();
    strokeWeight(1);

    // tinkerbell fractal equation
    xnext = x*x - y*y + a*x + b*y;
    ynext = 2*x*y + c*x + d*y;
    // making it 3D
    znext = noise(frameRate()) + xnext*ynext;

    x = xnext;
    y = ynext;
    z = znext;

    prevx = x;
    prevy = y;
    prevz = z;
   
    var vector = new Vector(x, y, z);
    points.push(vector)
    //circle(x, y, z);
   
    var red = 10;
    var green = 70;
    var blue = 40;
    stroke(red, green, blue, 70);

    for (var i = 0; i < points.length; i++) {
        // circle(points[i].x, points[i].y, points[i].z); 

        //if u want points instead of circles
        var pointX = points[i].x;
        var pointY = points[i].y;
        var pointZ = points[i].z;

        push();
        translate(pointX, pointY, pointZ);

        red -= 1;
        green += 2;
        blue += 1;

        stroke(red, green, blue, 70);
        sphere(0.01); // Adjust the size of the sphere as needed
        pop();
    }
    endShape();
    pop();
}