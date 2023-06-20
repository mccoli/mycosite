// attaching script to canvas elements
const canvas = document.getElementById('canvas');
const canvas1 = document.getElementById('canvas1');

// telling program im going to render in 2d
const context = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

// creating image object
const img = new Image();
img.src = 'img/oyster-mushrooms.jpg';

// pixel layout
const edge = [  
    [-1, -1, -1],
    [-1,  8, -1],
    [-1, -1, -1]
];

// when the page loads, execute this function
img.addEventListener('load', function(){
    // draw img 
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    // reading pixels
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
    //console.log(pixels);

    //find edges
    let outputCanvas = convolve(pixels, edge);

    //context.drawImage(outputCanvas, 500, 0, canvas1.width, canvas1.height);
    context.drawImage(outputCanvas.canvas, 1000, 0, canvas1.width, canvas1.height);

    //console.log(findContrast(outputCanvas, canvas1, context));
})


function convolve(input, kernel) {
    // create output image with the same dimensions as input
    let output = context.createImageData(input.width, input.height);
    
    for (let y = 1; y < input.height - 1; y++) {
        for (let x = 1; x < input.width - 1; x++) {
            let sumR = 0;
            let sumG = 0;
            let sumB = 0;
    
            for (let offsetY = -1; offsetY <= 1; offsetY++) {
                for (let offsetX = -1; offsetX <= 1; offsetX++) {
                    let neighbourIndex = (y + offsetY) * input.width + (x + offsetX);
    
                    let r = input.data[neighbourIndex * 4];
                    let g = input.data[neighbourIndex * 4 + 1];
                    let b = input.data[neighbourIndex * 4 + 2];
    
                    sumR += r * kernel[offsetY + 1][offsetX + 1];
                    sumG += g * kernel[offsetY + 1][offsetX + 1];
                    sumB += b * kernel[offsetY + 1][offsetX + 1];
                }
            }
    
            sumR = Math.max(0, Math.min(sumR, 255));
            sumG = Math.max(0, Math.min(sumG, 255));
            sumB = Math.max(0, Math.min(sumB, 255));
    
            let index = (y * input.width + x) * 4;
            output.data[index] = sumR;
            output.data[index + 1] = sumG;
            output.data[index + 2] = sumB;
            output.data[index + 3] = 255;
        }
    }    
    
    canvas1.width = canvas.width;
    canvas1.height = canvas.height;
    let outputContext = canvas1.getContext('2d');
    outputContext.putImageData(output, 0, 0);
    return outputContext;
}



// function findContrast(input, canvas, context) {
//     // get image data from the canvas
//     const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
//     const data = pixels.data;

//     // Initialise array to hold high contrast points
//     const highContrastPoints = [];

//     for (let i = 0; i < data.length; i += 4) {
//       const r1 = data[i];
//       const g1 = data[i + 1];
//       const b1 = data[i + 2];
  
//       for (let j = i + 4; j < data.length; j += 4) {
//         const r2 = data[j];
//         const g2 = data[j + 1];
//         const b2 = data[j + 2];
  
//         const luminance1 = 0.299 * r1 + 0.587 * g1 + 0.114 * b1;
//         const luminance2 = 0.299 * r2 + 0.587 * g2 + 0.114 * b2;
  
//         const contrast = Math.abs(luminance1 - luminance2);
  
//         if (contrast > 64) { // adjust threshold as needed
//           const x1 = (i / 4) % canvas.width;
//           const y1 = Math.floor(i / 4 / canvas.width);
//           const x2 = (j / 4) % canvas.width;
//           const y2 = Math.floor(j / 4 / canvas.width);
  
//           highContrastPoints.push({x1, y1, x2, y2, contrast});
//         }
//       }
//     }
  
//     return highContrastPoints;
//   }
