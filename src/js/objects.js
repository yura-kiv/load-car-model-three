import * as THREE from "three";
import PlaneTextureARM from "/planeModel/raw_plank_wall_arm_1k.jpg";
import PlaneTextureDiff from "/planeModel/raw_plank_wall_diff_1k.jpg";
import PlaneTextureDisp from "/planeModel/raw_plank_wall_disp_1k.jpg";
import PlaneTextureNor from "/planeModel/raw_plank_wall_nor_gl_1k.jpg";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const planeTextureARM = new THREE.TextureLoader().load(PlaneTextureARM);
const planeTextureDiff = new THREE.TextureLoader().load(PlaneTextureDiff);
const planeTextureDisp = new THREE.TextureLoader().load(PlaneTextureDisp);
const planeTextureNor = new THREE.TextureLoader().load(PlaneTextureNor);
const gltfLoader = new GLTFLoader();
const carURL = "/carModel/ToyCar.gltf";

export const getPlane = (viewer) => {
  planeTextureDiff.repeat.set(2, 2);
  const geometry = new THREE.PlaneGeometry(5, 5, 30, 30);
  const material = new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
    map: planeTextureDiff,
    displacementMap: planeTextureDisp,
    displacementScale: 0.2,
    aoMap: planeTextureARM,
    roughnessMap: planeTextureARM,
    metalnessMap: planeTextureARM,
    normalMap: planeTextureNor,
  });
  const plane = new THREE.Mesh(geometry, material);
  plane.receiveShadow = true;
  plane.rotation.x = -Math.PI / 2;
  viewer.scene.add(plane);
};

export const getCar = (viewer) => {
  gltfLoader.load(
    carURL,
    (gltf) => {
      console.log("model loaded successfully");
      const carModel = gltf.scene;
      carModel.scale.set(50, 50, 50);
      carModel.position.set(0, 1, 0);
      carModel.castShadow = true;
      carModel.children.forEach((child) => (child.castShadow = true));
      viewer.scene.add(carModel);
    },
    (progress) => {
      console.log("model is loading");
      console.log(progress);
    },
    (err) => {
      console.log("model loading failed");
      console.log(err);
    }
  );
};
