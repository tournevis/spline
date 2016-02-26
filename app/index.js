import Webgl from './Webgl';
import Sound from './sound';
import raf from 'raf';
import dat from 'dat-gui';
import 'gsap';

let webgl;
let gui;
let sound
// webgl settings
webgl = new Webgl(window.innerWidth, window.innerHeight);
sound = new Sound();
document.body.appendChild(webgl.renderer.domElement);

// Sounds Init :
sound.loadSound("tab-anitek-opaque.mp3")

// GUI settings
gui = new dat.GUI();
gui.add(webgl.params, 'usePostprocessing');

// handle resize
window.addEventListener('resize', resizeHandler);

// let's play !
animate();

function resizeHandler() {
  webgl.resize(window.innerWidth, window.innerHeight);
}

function animate() {
  raf(animate);
  //console.log(sound.getData());
  sound.getData();
  webgl.render();
}
