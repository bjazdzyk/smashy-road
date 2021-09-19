import * as THREE from 'https://threejs.org/build/three.module.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


//cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const loop=()=>{
	requestAnimationFrame(loop)
	renderer.render(scene, camera)
	cube.rotation.x+=0.01
	cube.rotation.y+=0.02
	cube.rotation.z+=0.03
}
loop()
camera.position.z = 5;
