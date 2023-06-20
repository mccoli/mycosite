const data = ["1.216", "1.253", "1.217", "1.185", "1.218", "1.146", "1.218", "1.224", "1.218", "1.345", "1.218", "1.466", "1.219", "1.592", "1.219", "1.714", "1.219", "1.825", "1.219", "1.941", "1.219", "2.063", "1.219", "2.121", "1.220", "2.179", "1.220", "2.111", "1.220", "2.024", "1.221", "1.922", "1.221", "1.810", "1.222", "1.704", "1.222", "1.607", "1.222", "1.544", "1.222", "1.607", "1.223", "1.670", "1.223", "1.709", "1.224", "1.684", "1.224", "1.743", "1.224", "1.728", "1.225", "1.757", "1.225", "1.728", "1.226", "1.747", "1.226", "1.714", "1.227", "1.631", "1.227", "1.558", "1.227", "1.636", "1.228", "1.728", "1.228", "1.815", "1.228", "1.903", "1.228", "1.941", "1.228", "1.874", "1.229", "1.820", "1.230", "1.854", "1.230", "1.854", "1.231", "1.893", "1.231", "1.975", "1.231", "2.072", "1.231", "2.145", "1.232", "2.271", "1.232", "2.378", "1.232", "2.485", "1.232", "2.591", "1.232", "2.703", "1.232", "2.805", "1.233", "2.887", "1.233", "2.955", "1.233", "2.926", "1.234", "2.843", "1.234", "2.756", "1.234", "2.669", "1.234", "2.562", "1.234", "2.465", "1.235", "2.349", "1.235", "2.252", "1.235", "2.145", "1.236", "2.077", "1.236", "1.971", "1.236", "1.888", "1.237", "1.898", "1.237", "1.864", "1.237", "1.941", "1.237", "2.024", "1.238", "2.097", "1.238", "2.126", "1.238", "2.043", "1.239", "1.975", "1.239", "1.922", "1.240", "1.922", "1.240", "1.864", "1.241", "1.917", "1.241", "1.883", "1.242", "1.835", "1.242", "1.757", "1.243", "1.694", "1.243", "1.641", "1.244", "1.563", "1.244", "1.500", "1.245", "1.447", "1.246", "1.486", "1.246", "1.495", "1.246", "1.592", "1.246", "1.675", "1.247", "1.786", "1.247", "1.878", "1.247", "1.980", "1.247", "2.063", "1.247", "2.121", "1.247", "2.077", "1.248", "2.155", "1.248", "2.237", "1.248", "2.324", "1.248", "2.378", "1.249", "2.363", "1.249", "2.446", "1.249", "2.533", "1.250", "2.465", "1.250", "2.378", "1.250", "2.271", "1.250", "2.160", "1.250", "2.058", "1.251", "1.946", "1.251", "1.840", "1.251", "1.728", "1.251", "1.631", "1.251", "1.515", "1.251", "1.398", "1.252", "1.301", "1.252", "1.214", "1.252", "1.141", "1.253", "1.107", "1.253", "1.069", "1.254", "1.044", "1.255", "1.049", "1.255", "0.991"];

var canvasHeight = 600;
var canvasWidth = 600;
// var cam;

var particles = [];
var particleIndex = 0;
var maxParticles = 121; // <- how many data points i gathered

// affects how much neighbouring vectors influence each other...lower for less influence, higher for more
var flow = 80;

// lower number means more vector paths for the particles to take
var res = 2;
var particleSpeed = 4;

var threshold = 1.5;

function setup() {
    canvas = createCanvas(canvasWidth, canvasHeight, WEBGL);
    // cam = createCamera();
    
    frameRate(30);
}

// iterate over the data...if a value is above threshold, trigger particle at that index to change colour
function draw(){
    background(0);
    //ambientLight(255);

    let camX = map(mouseX, 0, canvasWidth, 200, -200);
    let camY = map(mouseY, 0, canvasHeight, 200, -200);
    camera(camX, camY, (height/2) / tan(PI/6), camX, camY, 0, 0, 1, 0);

    normalMaterial();
    box(100);

    if(particleIndex < maxParticles) {
        particles[particleIndex++] = new particle(canvasWidth + 10, random(canvasHeight));

        for(var i = 0; i < particleIndex; i++) {
            // check if data point at this index is above threshold
            if(data[i] > threshold) {
                particles[i].glow();
            }

            particles[i].run();
        }
    }
}

function particle(x, y) {
    this.x = x;
    this.y = y;
    this.v = [-1 , 0];
    this.a = [0 , 0];
    this.prevx = this.x;
    this.prevy = this.y;

    this.run = function() {
        this.show();
        this.updatePreviousPos();
        this.update();
        this.edges();
    }
    
    this.show = function () {
        fill(200);
        circle(this.x, this.y, 5);
        stroke(255);
        strokeWeight(3);
        // line(this.x, this.y, this.prevx, this.prevy);
        this.updatePreviousPos();
    }

    this.updatePreviousPos = function() {
        this.prevx = this.x;
        this.prevy = this.y;
    }
    
    this.update = function() {
        this.v = [cos(noise(this.x/flow, this.y/flow) * TWO_PI), sin(noise(this.x/flow, this.y/flow) * TWO_PI)];
        this.x += this.v[0] * particleSpeed;
        this.y += this.v[1] * particleSpeed;
    }

    this.edges = function() {
        if (this.x < -300) {
            this.x = canvasWidth + 10;
            this.y = random(canvasHeight);
            this.updatePreviousPos();
        }
    }

    // ! whys it only triggered with line()?? >.<
    this.glow = function() {
        // fill(255, 0, 0);
        // circle(this.x, this.y, 5);
        stroke(255, 0, 200);
        line(this.x, this.y, this.prevx, this.prevy);
    }
}