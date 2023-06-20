// basis of code from: https://tympanus.net/codrops/2019/11/13/high-speed-light-trails-in-three-js/
import * as THREE from '../node_modules/three/build/three.module.js';

export class Highway {
    constructor(webgl, options) {
        this.webgl = webgl;
        this.options = options;
    }
    init() {
        const options = this.options;
        // using buffer geometry for better memory
        const geometry = new THREE.PlaneBufferGeometry(
            options.width,
            options.length,
            20,
            200
        );
        const material = new THREE.ShaderMaterial({ 
            fragmentShader, 
            vertexShader,
            uniforms: {
                uColor:  new THREE.Uniform(new THREE.Color(0x101012)) 
            }
        });
        const mesh = new THREE.Mesh(geometry, material);

        // rotate on the axis to make it flat on the ground
        mesh.rotation.x = -Math.PI / 2;
        // after the rotation the y-axis becomes the z-axis
        mesh.position.z = -options.length / 2;

        this.webgl.scene.add(mesh);
    }
}
// custom shaders 
const fragmentShader = `
    uniform vec3 uColor;
	void main(){
        gl_FragColor = vec4(uColor,1.);
    }
`;
const vertexShader = `
	void main(){
        vec3 transformed = position.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed.xyz, 1.);
	}
`

export class Lights {
    constructor(webgl, options) {
        this.webgl = webgl;
        this.options = options;
    }
    init() {
        const options = this.options;
        // creating tube geometry with length of 1
        // alter later in tube's vertex shader!
        let curve = new THREE.LineCurve3(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, -1)
        );
        // let baseGeometry = new THREE.TubeBufferGeometry(curve, 25, 1, 8, false);

        let aOffset = [];

            let sectionWidth = options.highwayWidth / options.highwaySections;

            for (let i = 0; i < options.nPairs; i++) {
              let radius = 1.;
              // 1a. Get it's lane index
              // Instead of random, keep lights per lane consistent
              let section = i % 3;

              // 1b. Get its lane's centered position
              let sectionX =
                section * sectionWidth - options.roadWifth / 2 + sectionWidth / 2;
              let carWidth = 0.5 * sectionWidth;
              let offsetX = 0.5 * Math.random();

              let offsetY = radius * 1.3;

              aOffset.push(sectionX - carWidth / 2 + offsetX);
              aOffset.push(offsetY);
              aOffset.push(-offsetZ);

              aOffset.push(sectionX + carWidth / 2 + offsetX);
              aOffset.push(offsetY);
              aOffset.push(-offsetZ);
            }
        // add the offset to the instanced geometry
        instanced.addAttribute(
            "aOffset",
            new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 3, false)
        );

        // using instantation to make lots of lights easily
        let instanced = new THREE.InstancedBufferGeometry().copy(geometry);
        instanced.maxInstancedCount = options.nPairs * 2;
        let material = new THREE.MeshBasicMaterial({ color: 0x545454 });
        var mesh = new THREE.Mesh(instanced, material);

        this.mesh = mesh;
        this.webgl.scene.add(mesh);
    }
}


class App {
	constructor(container, options){
		super(container);
		
        this.camera.position.z = -4;
        this.camera.position.y = 7;
        this.camera.position.x = 0;
        
        this.highway = new Highway(this, options);
	}
	init(){
        this.highway.init();
        this.tick();
	}
}