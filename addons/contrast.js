// binding js canvas to the one in my html
const canvas2 = document.getElementById('canvas2')

// telling program im going to render in 2d
const context2 = canvas2.getContext('2d');
canvas2.width = 800;
canvas2.height = 600;

// creating image object
const img2 = new Image();
img2.src = 'img/laplacian.png';

img2.addEventListener('load', function() {
    const blackPixels = findContrast();
    const vectorField = createVectorField(blackPixels);
    console.log(vectorField);
    console.log("done!");
})

function findContrast() {
    /* scan the r, g, b elements of each pixel   
     * they should either be super high or super low number
     * have an array to sort the black pixels into */

    // get image data from the canvas
    const pixels = context2.getImageData(0, 0, canvas2.width, canvas2.height);
    const data = pixels.data;
    //console.log(data);

    // initialise array to hold found black pixels
    const blackPixels = [];

    // loop over RGBA pixels in image
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // check if the pixel is close to black
        if (r < 10 && g < 10 && b < 10) { // Adjust the threshold values as needed
            const x = (i / 4) % canvas.width;
            const y = Math.floor(i / (4 * canvas.height));
    
            // Add the black pixel coordinates to the array
            blackPixels.push({ x, y });
        }
    }
    console.log("black pixels logged.");
    return blackPixels;
}

function createVectorField(blackPixels) {
    // intialise empty array to hold the vectors
    const vectors = [];

    // looping over the black pixels
    for (const pixel of blackPixels) {
        const { x, y } = pixel;

        // calculating the vector based on pixel coords?
        const vector = { x: x - canvas.width / 2, y: y - canvas.height / 2 };

        // add the vector to the array
        vectors.push(vector);
    }
    console.log("vector field created.");
    return vectors;
}