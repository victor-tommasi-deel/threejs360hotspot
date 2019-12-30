import {
  Scene,
  PerspectiveCamera,
  Color,
  WebGLRenderer,
  TorusGeometry,
  MeshBasicMaterial,
  Mesh,
  AxesHelper,
  Raycaster,
  Vector2,
  CircleGeometry,
  MeshPhongMaterial,
  AmbientLight
} from 'three';

const addAxis = (scene) => {
  scene.add(new AxesHelper(5));
};

const hsl = (h, s, l) => {
  return new Color().setHSL(h, s, l);
};

const createSphere = () => {
  const geometry = new CircleGeometry(4, 60);
  const material = new MeshPhongMaterial({
    color: 0xd1ced7,
    opacity: 0.3,
    transparent: true
  });
  const sphere = new Mesh(geometry, material);
  sphere.name = 'sphere';
  return sphere;
};

const createRing = function(radius, tube, radialSegment, tubularSegment, color) {
  const geometry = new TorusGeometry(radius, tube, radialSegment, tubularSegment);
  const material = new MeshBasicMaterial({ color: color, wireframe: false });
  const ring = new Mesh(geometry, material);
  ring.name = 'ring';
  return ring;
};

const createStaturn = (sphere, rings) => {
  const { innerWidth, innerHeight } = window;
  const scene = new Scene();
  scene.background = new Color(0xffffff);
  const camera = new PerspectiveCamera(75, innerWidth / innerHeight, 1, 1000);
  camera.position.z = 20;
  camera.position.y = 2;
  sphere.position.z = -59;
  sphere.position.y = 1.16;
  scene.add(sphere);
  rings.map((ring) => {
    ring.position.y = 0.7;
    ring.position.z = -100;
    scene.add(ring);
  });
  const light = new AmbientLight(0x404040);
  scene.add(light);
  const raycaster = new Raycaster();
  const renderer = new WebGLRenderer();
  const mouse = new Vector2();
  renderer.setSize(innerWidth, innerHeight);
  return {
    renderer,
    scene,
    camera,
    raycaster,
    mouse
  };
};

export { createStaturn, addAxis, createRing, createSphere, hsl };
