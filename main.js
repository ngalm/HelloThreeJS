import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';

import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';


// set up loader, scene, camera, and renderer
const loader = new GLTFLoader();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(2, 4, 10);    // pov: straight on like person walking on path
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Pointer Lock camera control
const controls = new PointerLockControls( camera, document.body );
// LOOK AT DOCUMENTATION EX COED

// load landscape model
loader.load( './assets/helloWorld.glb', function ( gltf ) {

  scene.add( gltf.scene );

}, undefined, function ( error ) {

  console.error( error );

} );

// add background light
scene.background = new THREE.Color(0xffd1ff);

// add sun
const sunlight = new THREE.DirectionalLight(0xffa5ff, 2);
sunlight.position.set(-5, 3, 5);
scene.add(sunlight);

// add ambient light
const ambient = new THREE.AmbientLight(0x4040ff, 1);
scene.add(ambient);

// animate scene
function animate() {
  renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );