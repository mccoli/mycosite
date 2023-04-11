var canvas;
let genome;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function preload() {
    // creates string array of individual lines
    // ?should i use data by line or by char?
    genome = loadStrings('data/GCA_008271545.1_ASM827154v1_genomic.fna');
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1000');

}

function draw() {
    background(25);

    // printing some chars to see if array was created properly
    for (let i = 1; i < 11; i++) {
        print(genome[i][0]);
        if (genome[i][0] == 'a' || 'A') {
            // design a shape or use strange attractor models for 'mycellium' to follow
            // i.e. the coordinates of the circles
            noStroke();
            fill('#F2BAC9');
            circle(i*50, (i*50) + 100, 10);
        }
        if (genome[i][0] == 'c' || 'C') {
            noStroke();
            fill('#9EB25D');
            circle(i*60, (i*50) + 100, 10);
        }
        if (genome[i][0] == 'g' || 'G') {
            noStroke();
            fill('#E55934');
            circle(i*70, (i*50) + 100, 10);
        }
        if (genome[i][0] == 't' || 'T') {
            noStroke();
            fill('#7BB2D9');
            circle(i*80, (i*50) + 100, 10);
        }

    }

}