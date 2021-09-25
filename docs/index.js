import * as THREE from 'https://threejs.org/build/three.module.js';
import {OrbitControls} from 'https://threejs.org/examples/jsm/controls/OrbitControls.js'
//funs
const rad_to_deg=(rad)=>{
  var pi = Math.PI;
  return rad * (180/pi);
}
const deg_to_rad=(deg)=>{
  var pi = Math.PI;
  return deg / (180/pi);
}
//scene & camera & renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


//ground
const ground_geometry = new THREE.BoxGeometry(20, 1, 20);
const ground_edges = new THREE.EdgesGeometry( ground_geometry );
const ground_line = new THREE.LineSegments( ground_edges, new THREE.LineBasicMaterial( { color: 0xbbbbbb } ) );
const ground_material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const ground = new THREE.Mesh( ground_geometry, ground_material );
scene.add(ground, ground_line);

//car
const car_geometry = new THREE.BoxGeometry(2, 1, 1);
const car_edges = new THREE.EdgesGeometry( car_geometry );
const car_line = new THREE.LineSegments( car_edges, new THREE.LineBasicMaterial( { color: 0x000000 } ) );
const car_material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
const car = new THREE.Mesh( car_geometry, car_material );
const CAR = new THREE.Group();
CAR.add(car)
CAR.add(car_line)
scene.add(CAR);
CAR.position.set(0, 1, 0)

//background & controls
scene.background = new THREE.Color( 0xa7faf2 );
const controls = new OrbitControls( camera, renderer.domElement );
controls.update();

const loop=()=>{
	requestAnimationFrame(loop)
  //update controls
  let cPos = CAR.position
  camera.position.set(cPos.x+10, cPos.y+14, cPos.z+10)
  controls.target.set(...CAR.position.toArray());
	controls.update();

  //renderer
	renderer.render(scene, camera)
}
//start game
loop()

