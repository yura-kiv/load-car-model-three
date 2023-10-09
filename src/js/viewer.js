import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export default class Viewer {
  constructor() {
    this.createResize();
    this.camera = this.createCamera();
    this.scene = this.createScene();
    this.renderer = this.createRenderer();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.1;
    this.controls.screenSpacePanning = false;
    this.createLight(this.scene);
    this.update(this.camera, this.scene, this.controls, this.renderer);
  }

  updateActionsPool = {};
  resizeActionsPool = {};

  createCamera() {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 25);
    camera.position.set(0, 5, 5);
    this.addResizeAction("resize_camera", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });

    return camera;
  }

  createScene() {
    const scene = new THREE.Scene();
    return scene;
  }

  createRenderer() {
    if (this.renderer) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      this.renderer.dispose();
    }
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      pixelRatio: window.devicePixelRatio,
    });
    renderer.setClearColor(0x141414);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.domElement.classList.add("car-canvas");
    this.addResizeAction("resize_renderer", () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    return renderer;
  }

  createLight(scene) {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight.position.set(10, 7, 10);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    scene.add(ambientLight);
  }

  addUpdateAction(name, action) {
    this.updateActionsPool[name] = action;
  }

  removeUpdateAction(name) {
    delete this.updateActionsPool[name];
  }

  createResize() {
    window.addEventListener("resize", () => {
      for (var key in this.resizeActionsPool) this.resizeActionsPool[key]();
    });
  }

  addResizeAction(name, action) {
    this.resizeActionsPool[name] = action;
  }

  removeResizeAction(name) {
    delete this.resizePool[name];
  }

  update(camera, scene, controls, renderer) {
    renderer.render(scene, camera);
    controls.update();
    for (const key in this.updateActionsPool) this.updateActionsPool[key]();
    requestAnimationFrame(() => this.update(camera, scene, controls, renderer));
  }
}
