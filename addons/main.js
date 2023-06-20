import * as THREE from '../node_modules/three/build/three.module.js';
import { TrackballControls } from '../node_modules/three/examples/jsm/controls/TrackballControls.js';

// basis of code from https://medium.com/nerd-for-tech/getting-started-with-your-first-three-js-project-part-two-the-build-3fd9a2f21418
const data = ["1.216", "1.253", "1.217", "1.185", "1.218", "1.146", "1.218", "1.224", "1.218", "1.345", "1.218", "1.466", "1.219", "1.592", "1.219", "1.714", "1.219", "1.825", "1.219", "1.941", "1.219", "2.063", "1.219", "2.121", "1.220", "2.179", "1.220", "2.111", "1.220", "2.024", "1.221", "1.922", "1.221", "1.810", "1.222", "1.704", "1.222", "1.607", "1.222", "1.544", "1.222", "1.607", "1.223", "1.670", "1.223", "1.709", "1.224", "1.684", "1.224", "1.743", "1.224", "1.728", "1.225", "1.757", "1.225", "1.728", "1.226", "1.747", "1.226", "1.714", "1.227", "1.631", "1.227", "1.558", "1.227", "1.636", "1.228", "1.728", "1.228", "1.815", "1.228", "1.903", "1.228", "1.941", "1.228", "1.874", "1.229", "1.820", "1.230", "1.854", "1.230", "1.854", "1.231", "1.893", "1.231", "1.975", "1.231", "2.072", "1.231", "2.145", "1.232", "2.271", "1.232", "2.378", "1.232", "2.485", "1.232", "2.591", "1.232", "2.703", "1.232", "2.805", "1.233", "2.887", "1.233", "2.955", "1.233", "2.926", "1.234", "2.843", "1.234", "2.756", "1.234", "2.669", "1.234", "2.562", "1.234", "2.465", "1.235", "2.349", "1.235", "2.252", "1.235", "2.145", "1.236", "2.077", "1.236", "1.971", "1.236", "1.888", "1.237", "1.898", "1.237", "1.864", "1.237", "1.941", "1.237", "2.024", "1.238", "2.097", "1.238", "2.126", "1.238", "2.043", "1.239", "1.975", "1.239", "1.922", "1.240", "1.922", "1.240", "1.864", "1.241", "1.917", "1.241", "1.883", "1.242", "1.835", "1.242", "1.757", "1.243", "1.694", "1.243", "1.641", "1.244", "1.563", "1.244", "1.500", "1.245", "1.447", "1.246", "1.486", "1.246", "1.495", "1.246", "1.592", "1.246", "1.675", "1.247", "1.786", "1.247", "1.878", "1.247", "1.980", "1.247", "2.063", "1.247", "2.121", "1.247", "2.077", "1.248", "2.155", "1.248", "2.237", "1.248", "2.324", "1.248", "2.378", "1.249", "2.363", "1.249", "2.446", "1.249", "2.533", "1.250", "2.465", "1.250", "2.378", "1.250", "2.271", "1.250", "2.160", "1.250", "2.058", "1.251", "1.946", "1.251", "1.840", "1.251", "1.728", "1.251", "1.631", "1.251", "1.515", "1.251", "1.398", "1.252", "1.301", "1.252", "1.214", "1.252", "1.141", "1.253", "1.107", "1.253", "1.069", "1.254", "1.044", "1.255", "1.049", "1.255", "0.991"];

// scene
const scene = new THREE.Scene();

// camera params are FOV(degrees), aspect ratio, near clip plane, far clip plane
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.6, 1200);
camera.position.z = 22;

// renderer
const renderer = new THREE.WebGLRenderer({antialias: true});

// renderer attributes
renderer.setClearColor(0xFFFFFF, 0);
renderer.setSize(window.innerWidth, window.innerHeight);

// adds renderer to body as a <canvas> element
document.body.appendChild(renderer.domElement);


// makes canvas responsive for all devices
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})

// creating light sources
const lights = [];
const lightHelpers = [];

const lightValues = [
    {colour: 0xF55D3E, intensity: 8, dist: 30, x: 1, y: 0, z: 8},
    {colour: 0x3B1C32, intensity: 8, dist: 30, x: -2, y: 1, z: -15},
    {colour: 0xA4D4B4, intensity: 6, dist: 30, x: 0, y: 10, z: 5},
    {colour: 0xD664BE, intensity: 2, dist: 30, x: 0, y: -10, z: -1},
    {colour: 0x538083, intensity: 8, dist: 30, x: 10, y: 3, z: 10},
    {colour: 0xF55D3E, intensity: 2, dist: 30, x: -10, y: -1, z: 0},
    {colour: 0xA4D4B4, intensity: 2.5, dist: 30, x: -5, y: -5, z: -10}
];
 
// populating lights array
for (let i = 0; i < 7; i++) {
    // creating lights with specified values
    lights[i] = new THREE.PointLight(
        lightValues[i]['colour'],
        lightValues[i]['intensity'],
        lightValues[i]['dist']);
    lights[i].position.set(
        lightValues[i]['x'],
        lightValues[i]['y'],
        lightValues[i]['z']);
    scene.add(lights[i]);

    // add a light helper for each light
    // lightHelpers[i] = new THREE.PointLightHelper(lights[i], 0.7);
    // scene.add(lightHelpers[i])
}

// trackball controls for camera
const controls = new TrackballControls(camera, renderer.domElement);
controls.rotateSpeed = 4;
controls.dynamicDampingFactor = 0.12;

const clock = new THREE.Clock();

// axes Helper
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper); // X == red, Y == green, Z == blue

// Create room dimensions
const roomRadius = 20;
const roomHeight = 20;
const roomSegments = 32;

// Create room geometry
const roomGeometry = new THREE.CylinderGeometry(roomRadius, roomRadius, roomHeight, roomSegments);

// Create room material
const roomMaterial = new THREE.MeshLambertMaterial({ color: 0xEDD1E1, side: THREE.BackSide });

// Create room mesh
const roomMesh = new THREE.Mesh(roomGeometry, roomMaterial);

// Add room mesh to the scene
scene.add(roomMesh);

// grass on top of the cylinder :) basis from: https://jsfiddle.net/felixmariotto/hvrg721n/ and https://jsfiddle.net/prisoner849/n1emstwd/
//////////////
// MATERIAL /
////////////
const vertexShader = `
  varying vec2 vUv;
  uniform float time;
  
  ${simpleNoise}
  
	void main() {

    vUv = uv;
    float t = time * 4.;
    
    // VERTEX POSITION
    
    vec4 mvPosition = vec4( position, 1.0 );
    #ifdef USE_INSTANCING
    	mvPosition = instanceMatrix * mvPosition;
    #endif
    
    // DISPLACEMENT
    
    float noise = smoothNoise(mvPosition.xz * 0.5 + vec2(0., t));
    noise = pow(noise * 0.5 + 0.5, 2.) * 2.;
    
    // here the displacement is made stronger on the blades tips.
    float dispPower = 1. - cos( uv.y * 3.1416 * 0.5 );
    
    float displacement = noise * ( 0.3 * dispPower );
    mvPosition.z -= displacement;
    
    //
    
    vec4 modelViewPosition = modelViewMatrix * mvPosition;
    gl_Position = projectionMatrix * modelViewPosition;

	}
`;

const fragmentShader = `
  varying vec2 vUv;
  
  void main() {
  	vec3 baseColor = vec3( 0.41, 1.0, 0.5 );
    float clarity = ( vUv.y * 0.575 ) + 0.325;
    gl_FragColor = vec4( baseColor * clarity, 1 );
  }
`;

const uniforms = {
	time: {
  	value: 0
  }
}

const leavesMaterial = new THREE.ShaderMaterial({
	vertexShader,
    fragmentShader,
    uniforms,
    side: THREE.DoubleSide
});

/////////
// MESH /
/////////
const instanceNumber = 13000;
const dummy = new THREE.Object3D();

const grassGeometry = new THREE.PlaneGeometry( 0.1, 4, 1, 4 );
grassGeometry.translate( 0, 2.2, 0 ); // move grass blade geometry lowest point at 0.

const instancedMesh = new THREE.InstancedMesh( grassGeometry, leavesMaterial, instanceNumber );

scene.add( instancedMesh );

// Position and scale the grass blade instances randomly.
for ( let i = 0; i < instanceNumber; i++ ) {
    // dummy.position.set(
    //     ( Math.random() - 0.5 ) * (roomRadius * 2),
    //     roomHeight / 2, 
    //     ( Math.random() - 0.5 ) * (roomRadius * 2)
    // );
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.sqrt(Math.random()) * roomRadius;

    dummy.position.set(
        Math.cos(angle) * radius * 3,
        roomHeight / 2,
        Math.sin(angle) * radius * 3
    );
  
    dummy.scale.setScalar( 0.5 + Math.random() * 0.5 );
    //Calculate the scaling factors based on the room's dimensions
    // const scaleX = roomRadius * (0.5 + Math.random() * 0.5);
    // const scaleZ = roomRadius * (0.5 + Math.random() * 0.5);
    // const scaleY = 0.1; // Adjust the Y scale to match the room's height

    //dummy.scale.setScalar(scaleX, scaleY, scaleZ);

    dummy.rotation.y = Math.random() * Math.PI;

    dummy.updateMatrix();
    instancedMesh.setMatrixAt( i, dummy.matrix );
}
//

// Flow Field Variables
const resolution = 2; // Grid resolution
const cols = Math.floor(roomRadius / resolution); // Number of columns in the grid
const rows = Math.floor(roomHeight / resolution); // Number of rows in the grid
const flowField = new Array(cols); // Flow field grid

// Create the flow field grid
for (let i = 0; i < cols; i++) {
    flowField[i] = new Array(rows);
    for (let j = 0; j < rows; j++) {
      // Create a random flow vector at each grid cell
      const angle = Math.random() * Math.PI * 2;
      const vector = new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0);
      flowField[i][j] = vector;
    }
  }

// Particle array
var particles = [];
var maxParticles = 300;

// how much particles affect their neighbours
var flow = 200;

// Create particles
for (var i = 0; i < maxParticles; i++) {
    const sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    // data visualisation
    // if (data[i] > threshold) {
    //     sphereMaterial.color.set(0x418a55); // green
    // } else {
    //     sphereMaterial.color.set(0xffffff); // white
    // }

    // Set initial positions of the particles
    const x = Math.random() * (roomRadius - 1) - (roomRadius / 2 - 0.5);
    const y = Math.random() * (roomHeight - 1) - (roomHeight / 2 - 0.5);
    const z = Math.random() * (roomSegments - 1) - (roomSegments / 2 - 0.5);
    sphere.position.set(x, y, z);

    // Set initial velocities of the particles
    const vx = Math.random() * 0.1 - 0.05 / flow; // Random value between -0.05 and 0.05
    const vy = Math.random() * 0.1 - 0.05 / flow; // Random value between -0.05 and 0.05
    const vz = Math.random() * 0.1 - 0.05 / flow; // Random value between -0.05 and 0.05
    sphere.userData.velocity = new THREE.Vector3(vx, vy, vz);

    // Add the particle to the scene
    scene.add(sphere);

    // Store the particle in the array
    particles.push(sphere);
}

// Update particle positions
function updateParticles() {
    for (let i = 0; i < particles.length; i++) {
      const sphere = particles[i];
  
      // Get the position of the particle in grid coordinates
      const col = Math.floor((sphere.position.x + window.innerWidth / 2) / resolution);
      const row = Math.floor((sphere.position.y + window.innerHeight / 2) / resolution);
  
      // Check if the particle is within the grid bounds
      if (col >= 0 && col < cols && row >= 0 && row < rows) {
        // Get the flow vector from the flow field at the particle's position
        const flowVector = flowField[col][row];
  
        // Adjust the particle's velocity based on the flow vector
        sphere.userData.velocity.add(flowVector);
  
        // Update the particle's position
        sphere.position.add(sphere.userData.velocity);
      }
    }
}

function attract(particle, particles, attractionForce, maxAcceleration) {
    const attractionForceVector = new THREE.Vector3(); // Initialize the attraction force vector
  
    for (let i = 0; i < particles.length; i++) {
      const neighbor = particles[i];
  
      // Skip the current particle
      if (neighbor === particle) continue;
  
      // Calculate the attraction force as the direction towards the neighbor
      const attractionDirection = neighbor.position.clone().sub(particle.position).normalize();
  
      // Calculate the attraction force magnitude
      const attractionMagnitude = attractionForce / Math.pow(particle.position.distanceTo(neighbor.position), 2);
  
      // Apply the attraction force to the particle's velocity
      attractionForceVector.add(attractionDirection.multiplyScalar(attractionMagnitude));
    }
  
    // Limit the acceleration of the particle
    attractionForceVector.clampLength(0, maxAcceleration);
  
    // Apply the attraction force to the particle's velocity
    particle.userData.velocity.add(attractionForceVector);
}

// Define a variable to track the current color index
let colorIndex = 0;

// Define an array of colors to cycle through
const colors = [0xFFFFFF, 0x90AA86, 0xF686BD, 0xFFFD77, 0xFE5D9F, 0x90AA86, 0X53599A];

// Function to change the color of the spheres
function changeSphereColor() {
    // Get the next color from the colors array
    const color = colors[colorIndex % colors.length];
    var threshold = 1.5;

    // Update the color of each sphere
    for (let i = 0; i < particles.length; i++) {
        const sphere = particles[i];
        if (data[i] > threshold) {
            sphere.material.color.setHex(color);
        }
    }

    // Increment the color index
    colorIndex++;

    // Call the function again after 2 seconds
    setTimeout(changeSphereColor, 2000);
}

// Start the color change process
changeSphereColor();

// Render loop
function animate() {
    // Hand a time variable to vertex shader for wind displacement.
	leavesMaterial.uniforms.time.value = clock.getElapsedTime();
    leavesMaterial.uniformsNeedUpdate = true;

    requestAnimationFrame(animate);
    scene.rotateY(0.005);

    // var threshold = 1.5;

    // Update particle positions
    for (let i = 0; i < particles.length; i++) {
        const sphere = particles[i];

        // if (data[i] > threshold) {
        //     // turn green after 2 seconds
        //     setTimeout(() => {
        //         sphere.material.color.setHex(0x418A55);
        //     }, i * 2000);
        // } 
        
        attract(sphere, particles, 0.00023, 0.002);

        // Update the position of the particle
        sphere.position.add(sphere.userData.velocity);

        // Check for collision with the walls
        if (sphere.position.x <= -roomRadius / 2 || sphere.position.x >= roomRadius / 2) {
            // Reflect the velocity along the x-axis
            sphere.userData.velocity.x *= -1;
        }
        if (sphere.position.y <= -roomHeight / 2 || sphere.position.y >= roomHeight / 2) {
            // Reflect the velocity along the y-axis
            sphere.userData.velocity.y *= -1;
        }
        if (sphere.position.z <= -roomRadius / 2 || sphere.position.z >= roomRadius / 2) {
            // Reflect the velocity along the z-axis
            sphere.userData.velocity.z *= -1;
        }
        

        // Calculate the distance from the central axis
        const distanceFromCenter = Math.sqrt(
            sphere.position.x * sphere.position.x + sphere.position.y * sphere.position.y
        );

        // Check for collision with the curved surface of the cylinder
        if (distanceFromCenter >= roomRadius / 2) {
            // Project the particle's position onto the curved surface of the cylinder
            const projection = new THREE.Vector3(
                sphere.position.x,
                sphere.position.y,
                0
            ).setLength(roomRadius / 2);

            // Calculate the reflection direction based on the surface normal
            const surfaceNormal = projection.clone().sub(sphere.position).normalize();
            const reflection = sphere.userData.velocity.clone().reflect(surfaceNormal);

            // Update the velocity with the reflection direction
            sphere.userData.velocity.copy(reflection);
        }
    }

    updateParticles();

    controls.update();
    renderer.render(scene, camera);
}
  
// Start rendering
animate();