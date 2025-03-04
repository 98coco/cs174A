import * as THREE from 'three';

// Creating a Scene
const scene = new THREE.Scene(); 
// Perspective camera is one camera used in three.js
// PerspectiveCamera( Field of View, Aspect Ratio, near clipping plane, far clipping plane )
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// creates a new WebGL renderer that will handle the rendering of 3D scenes using WebGL (Web Graphics Library)
const renderer = new THREE.WebGLRenderer();
// creating the size we want to render app and in this case we are setting it to the window size
// add false as a third parameter to render it at a lower resolution
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// Creating the cube
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// Material we want to put on the cube
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// .Mesh takes a geometry and applies a material to it
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// move camera out a bit because when we add the cube to the scene it will be placed
// at (0,0,0) and causes the camera and the cube to be isnide each other
camera.position.z = 5;

// allows us to move the camera around the scene
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//.....//
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 5, 10); // Where the camera is.
controls.target.set(0, 5, 0); // Where the camera is looking towards.


// where we actually start to render what we created above -- this part of the code runs more than once 
// this function is called each frame (30-60 times per second)
function animate() {

    controls.update(); // This will update the camera position and target based on the user input.

    // cube has rotation animation 
    // runs every frames (normally 60 times per second)
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

    // renders the scene using our WebGL renderer we created --> renderer is in charge of rendering our screen
    // displays all objects in scene from camera specified
	renderer.render( scene, camera );

}

function createAxisLine(color, start, end) {
    const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
    const material = new THREE.LineBasicMaterial({ color: color });
    return new THREE.Line(geometry, material);
}

// Create axis lines
const xAxis = createAxisLine(0xff0000, new THREE.Vector3(0, 0, 0), new THREE.Vector3(5, 0, 0)); // Red
const yAxis = createAxisLine(0x00ff00, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 5, 0)); // Green
const zAxis = createAxisLine(0x0000ff, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 5)); // Blue

// Add axes to scene
scene.add(xAxis);
scene.add(yAxis);
scene.add(zAxis);

//allows us to see the z axis since without it we only see 2 axis (z axis is pointing towards us)
camera.position.y = 1;