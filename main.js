import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// set up loader, renderer, scene, and camera
const loader = new GLTFLoader();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

camera.position.set(2, 4, 10); // pov: straight on like person walking on path

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

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

// add fog 
//scene.fog = new THREE.Fog(0xffd1a4, 10, 50);



// animate scene
function animate() {
  renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );