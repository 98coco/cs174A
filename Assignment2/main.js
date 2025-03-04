import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { cos } from 'three/tsl';


const scene = new THREE.Scene();

//THREE.PerspectiveCamera( fov angle, aspect ratio, near depth, far depth );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 5, 10);
controls.target.set(0, 5, 0);

// Rendering 3D axis
const createAxisLine = (color, start, end) => {
    const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
    const material = new THREE.LineBasicMaterial({ color: color });
    return new THREE.Line(geometry, material);
};
const xAxis = createAxisLine(0xff0000, new THREE.Vector3(0, 0, 0), new THREE.Vector3(3, 0, 0)); // Red
const yAxis = createAxisLine(0x00ff00, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 3, 0)); // Green
const zAxis = createAxisLine(0x0000ff, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 3)); // Blue
scene.add(xAxis);
scene.add(yAxis);
scene.add(zAxis);


// ***** Assignment 2 *****
// Setting up the lights
const pointLight = new THREE.PointLight(0xffffff, 100, 100);
pointLight.position.set(5, 5, 5); // Position the light
scene.add(pointLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0.5, .0, 1.0).normalize();
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x505050);  // Soft white light
scene.add(ambientLight);

const phong_material = new THREE.MeshPhongMaterial({
    color: 0x00ff00, // Green color
    shininess: 100   // Shininess of the material
});


// Start here.

//blue is z axis
//red is x axis
//green is y axis

const l = 0.5
const positions = new Float32Array([
    // Front face - counterclockwise
    -l, -l,  l, // 0  
     l, -l,  l, // 1 
     l,  l,  l, // 2
    -l,  l,  l, // 3 

    // Left face   - counterclockwise
    -l, -l, -l, // 4
    -l, -l,  l, // 5
    -l,  l,  l, // 6 
    -l,  l, -l, // 7
  
    // Top face
    -l, l, l, // 8
    l, l, l, // 9
    l, l, -l, //10
    -l, l, -l, //11

    // Bottom face
    -l, -l, -l, //12
    l, -l, -l, //13
    l, -l, l, //14
    -l, -l, l, //15

    // Right face
    l, l, l, //16
    l,  -l,  l, //17
    l, -l, -l, //18
    l, l, -l, //19

     // Back face
     l, l, -l, //20
     l, -l, -l, //21 
     -l, -l, -l, //22
     -l, l, -l //23


  ]);
  
  const indices = [
    // Front face
    0, 1, 2,
    0, 2, 3,
  
    // Left face
    4, 5, 6,
    4, 6, 7,
  
    // Top face
    8, 9, 10,
    8, 10, 11,

  
    // Bottom face
    13, 14, 15,
    13, 15, 12, 
  
    // Right face
    17, 18, 19,
    17, 19, 16,

    // Back face
    21, 22, 23,
    21, 23, 20
  ];
  
  // Compute normals
  const normals = new Float32Array([
    // Front face
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
  
    // Left face
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
  
    // Top face
    0, 1, 0,
    0, 1, 0, 
    0, 1, 0, 
    0, 1, 0,  
  
    // Bottom face
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,

  
    // Right face
    1,0,0,
    1,0,0,
    1,0,0,
    1,0,0,

    // Back face
    0,0,-1,
    0,0,-1,
    0,0,-1,
    0,0,-1

  ]);

// creating new object and setting its attributes to the geometry we defined
const custom_cube_geometry = new THREE.BufferGeometry();
custom_cube_geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));  // setting the position attribute
custom_cube_geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3)); // setting the normal attribute
custom_cube_geometry.setIndex(new THREE.BufferAttribute(new Uint16Array(indices), 1)); // setting the index attribute

// drawing the cube

// let wireframe_cube = new THREE.LineSegments( custom_cube_geometry, phong_material );
// let solid_cube = new THREE.Mesh(custom_cube_geometry, phong_material);
// scene.add(solid_cube);
// scene.add(wireframe_cube);
// wireframe_cube.visible = !wireframe_cube.visible


// TODO: Implement wireframe geometry

const wireframe_vertices = new Float32Array([
  // Front face
      -l, -l, l,
      l, -l, l,
      l, -l, l,
      l, l, l,
      l, l, l,
      -l, l, l,
      -l, l, l,
      -l, -l, l,
  // Top face
  -l, l, l,
  l, l, l,
  l, l, l,
  l, l, -l,
  l, l, -l,
  -l, l, -l,
  -l, l, -l,
  -l, l, l,
 

  //Bottom Face
  l, -l, -l,
  l, -l, l,
  l, -l, l,
 -l, -l, l,
 -l, -l, l,
 -l, -l, -l,
 -l, -l, -l,
 l, -l, -l,

  //Right Face
  l, l, l,
  l,  -l,  l,
  l,  -l,  l,
  l, -l, -l,
  l, -l, -l,
  l, l, -l,
  l, l, -l,
  l, l, l,

  //Left Face
  -l, -l, -l, 
  -l, -l,  l,
  -l, -l,  l,
  -l,  l,  l,
  -l,  l,  l,
  -l,  l, -l,
  -l,  l, -l,
  -l, -l, -l,

  //Back Face
  l, -l, -l,
  -l, -l, -l,
  -l, -l, -l,
  -l, l, -l,
  -l, l, -l,
  l, l, -l,
  l, l, -l,
  l, -l, -l,
    
]);

const wireframe_geometry = new THREE.BufferGeometry();
wireframe_geometry.setAttribute( 'position', new THREE.BufferAttribute( wireframe_vertices, 3 ) );
const line = new THREE.LineSegments(wireframe_geometry, new THREE.LineBasicMaterial({ color: 0xffffff }) );

function translationMatrix(tx, ty, tz) {
	return new THREE.Matrix4().set(
		1, 0, 0, tx,
		0, 1, 0, ty,
		0, 0, 1, tz,
		0, 0, 0, 1
	);
}
// TODO: Implement the other transformation functions.

function rotationMatrixZ(theta) {
	return new THREE.Matrix4().set(
    Math.cos(theta), -(Math.sin(theta)), 0, 0,
    Math.sin(theta), Math.cos(theta), 0, 0, 
    0, 0, 1, 0,
    0, 0, 0, 1
	);
}

function scalingMatrix(sx, sy, sz) {
  return new THREE.Matrix4().set(
    sx, 0, 0, 0,
    0, sy, 0, 0,
    0, 0, sz, 0,
    0, 0, 0, 1
  );
}


let wireframe_cubes = [];
let solid_cubes =[];
for (let i = 0; i < 7; i++) {

  let s_cube = new THREE.Mesh(custom_cube_geometry, phong_material);
  s_cube.matrixAutoUpdate = false;
  solid_cubes.push(s_cube);
  scene.add(s_cube);

  let cube = new THREE.LineSegments(wireframe_geometry,  new THREE.LineBasicMaterial({ color: 0xffffff }));
  cube.matrixAutoUpdate = false;
	wireframe_cubes.push(cube);
	scene.add(cube);
  wireframe_cubes[i].visible = !wireframe_cubes[i].visible

}


let animation_time = 0;
let delta_animation_time;
let rotation_angle;
let rotation_angle_radians;
const clock = new THREE.Clock();

let MAX_ANGLE = 10 * Math.PI/180 // 10 degrees converted to radians
let T = 2 // oscilation period in seconds

function animate() {

delta_animation_time = clock.getDelta();
animation_time += delta_animation_time; 

//rotation function of time:
rotation_angle = 5 + (5 * Math.sin(animation_time*Math.PI - Math.PI/2))  //in degrees
rotation_angle_radians = (rotation_angle*Math.PI)/180;
//degree 

const rotation = rotationMatrixZ(rotation_angle_radians); //insert into transformation for the tilting 

// TODO: Transform cubes

const angle_radians= Math.PI*10/180;
const translation = translationMatrix(0, 3*l, 0); // Translate 2l units in the y direction
const translation_origin = translationMatrix(l,1.5*l,0); //translate to origin 
const rotate10 = rotationMatrixZ(angle_radians); //rotate by 10 degrees for the static 
const translation_origin_reverse = translationMatrix(-l,-1.5*l,0); // translate reverse
const scaling_transformation = scalingMatrix(1,1.5,1);

let transformations = new THREE.Matrix4(); //will hold our transformations
  //remember that multiplyMatrices is an in place operation
  if(still){
    transformations.multiplyMatrices(rotate10, translation_origin); 
  }
  else{
    transformations.multiplyMatrices(rotation, translation_origin); 
  }

  // transformations.multiplyMatrices(rotation, translation_origin); 
  //premultiply does the matrix you pass into it times transformations (right to left)
  transformations.premultiply(translation_origin_reverse);
  transformations.premultiply(translation);

  if (!change){
    for (let i = 0; i < solid_cubes.length; i++) {
      solid_cubes[i].matrix.copy(scaling_transformation);
      scaling_transformation.multiplyMatrices(transformations, scaling_transformation);
    }
  }
  else{
    for (let i = 0; i < wireframe_cubes.length; i++) {
      wireframe_cubes[i].matrix.copy(scaling_transformation);
      scaling_transformation.multiplyMatrices(transformations, scaling_transformation);
    }
  }

	renderer.render( scene, camera );
  controls.update();


}
renderer.setAnimationLoop( animate );

// TODO: Add event listener

let still = false;
let change = false;
window.addEventListener('keydown', onKeyPress); // onKeyPress is called each time a key is pressed
// Function to handle keypress
function onKeyPress(event) {
    switch (event.key) {
        case 's': // Note we only do this if s is pressed.
            still = !still;
            break;
        case 'w':
            for(let i =0; i < solid_cubes.length; i++){
              solid_cubes[i].visible = !solid_cubes[i].visible; 
              wireframe_cubes[i].visible = !wireframe_cubes[i].visible;
              change = !change;
            }
        default:
            console.log(`Key ${event.key} pressed`);
    }
}