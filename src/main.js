
import { render } from 'vue';
import './style.css'

import videoUrl from "./TiktokGuy.mp4"

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
const scene =  new THREE.Scene;

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector ('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);



const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial( {color: 0xFF6347 } );
const torus = new THREE.Mesh( geometry, material);


const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight, pointLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function animate (){
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;
    renderer.render(scene, camera);
    controls.update();
}

function addStar(){
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
    const star = new THREE.Mesh( geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y ,z);
    scene.add(star);
}
Array(200).fill().forEach(addStar);

const video = document.createElement('video');
video.width = 320;
video.height = 240;
video.controls = true;

const mp4Source = document.createElement('source');

mp4Source.src = videoUrl;

video.appendChild(mp4Source);

const videoTexture = new THREE.VideoTexture(video);

const videoMaterial = new THREE.MeshBasicMaterial ({
    map: videoTexture
});

const videoMesh = new THREE.Mesh(geometry, videoMaterial);
scene.add(videoMesh);
video.play();
animate();