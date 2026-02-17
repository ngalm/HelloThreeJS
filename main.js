import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
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

const blocker = document.getElementById( 'blocker' );
const instructions = document.getElementById( 'instructions' );

instructions.addEventListener( 'click', function () {
  controls.lock();                      // when user clicks inside 'instructions' html element, pointer is locked (camera controls are active)
} );

controls.addEventListener( 'lock', function () {
  instructions.style.display = 'none';   // don't display instructions menu or block overlay when pointer is locked (controls are active)
  blocker.style.display = 'none';
} );

controls.addEventListener( 'unlock', function () {
  blocker.style.display = 'block';       // display instructions menu and block overlay when pointer is unlocked (controls deactivated)
  instructions.style.display = '';
} );

const keys = {}
document.addEventListener('keydown', e => keys[e.code] = true);     // if a key is pressed it's flagged 'true' in keys object
document.addEventListener('keyup', e => keys[e.code] = false);      // 

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
  // move camera along xz-axis if controls are locked and a WASD key is pressed
  if (controls.isLocked) {
    if (keys['KeyW']) controls.moveForward(.1);
    if (keys['KeyS']) controls.moveForward(-.1);
    if (keys['KeyA']) controls.moveRight(-.1);
    if (keys['KeyD']) controls.moveRight(.1);
  }
  renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );