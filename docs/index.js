import * as THREE from 'https://threejs.org/build/three.module.js';
import {OrbitControls} from 'https://threejs.org/examples/jsm/controls/OrbitControls.js'
console.log(OrbitControls)
const rad_to_deg=(rad)=>{
  var pi = Math.PI;
  return rad * (180/pi);
}

const deg_to_rad=(deg)=>{
  var pi = Math.PI;
  return deg / (180/pi);
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


//cube
const geometry = new THREE.BoxGeometry(20, 1, 20);
const edges = new THREE.EdgesGeometry( geometry );
const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xbbbbbb } ) );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add(cube, line);

camera.position.z = 15
camera.position.x = 15
camera.position.y = 15


camera.lookAt(0, 0, 0)
//camera.rotation.x = deg_to_rad(1)
scene.background = new THREE.Color( 0xa7faf2 );


const controls = new OrbitControls( camera, renderer.domElement );
controls.update();

const loop=()=>{
	requestAnimationFrame(loop)
	controls.update();
	renderer.render(scene, camera)
}
loop()

