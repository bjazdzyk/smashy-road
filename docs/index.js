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
const ctg=(x)=> { return 1 / Math.tan(x); }

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

//background & orbit controls
scene.background = new THREE.Color( 0xa7faf2 );
const controls = new OrbitControls( camera, renderer.domElement );
controls.update();

//physics
let DIR = 0
let dirX
let dirZ
let FX = 0
let FZ = 0

//camera.position.set(10, 30, 10)
const loop=()=>{
	requestAnimationFrame(loop)

  //update car direction
  dirZ = -Math.sin(deg_to_rad(DIR))
  dirX = Math.cos(deg_to_rad(DIR))



  //controls
  if(keys["ArrowLeft"]){
    DIR += 5
    CAR.rotation.y = deg_to_rad(DIR)
  }
  if(keys["ArrowRight"]){
    DIR -= 5
    CAR.rotation.y = deg_to_rad(DIR)
  }
  if(keys["ArrowUp"]){
    FX += dirX
    FZ += dirZ
    CAR.position.x += FX * 0.01
    CAR.position.z += FZ * 0.01
  }else{
    CAR.position.x += FX * 0.01
    CAR.position.z += FZ * 0.01
  }


  //update orbit controls
  let cPos = CAR.position
  camera.position.set(cPos.x+10, cPos.y+15, cPos.z+10)
  controls.target.set(...CAR.position.toArray());
	controls.update();

  //renderer
	renderer.render(scene, camera)
}
//events
let keys = {}
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
function keyDown(e) {
  keys[e.code] = true
  console.log(e.code + "down");
}
function keyUp(e) {
  keys[e.code] = null
  console.log(e.code + "up");
}

//start game
loop()

