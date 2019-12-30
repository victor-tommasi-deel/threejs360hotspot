import React from 'react';
import { createStaturn, createRing, createSphere, hsl } from './utils/utils';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ADD: 0.1,
      renderer: null,
      scene: null,
      camera: null,
      rings: [],
      raycaster: null,
      mouse: null,
      STOP: false
    };
  }

  componentDidMount = () => {
    const ringOne = createRing(11, 3.1, 16, 100, 0x469ed7);
    const sphere = createSphere();
    const start = createStaturn(sphere, [ringOne]);
    const viewer = document.getElementById('viewer');
    viewer.appendChild(start.renderer.domElement);
    const { renderer, scene, camera, raycaster, mouse } = start;
    this.setState({
      renderer,
      scene,
      camera,
      rings: [ringOne],
      raycaster,
      mouse
    });
    document.addEventListener(
      'mousedown',
      (event) => {
        event.preventDefault();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        // find intersections
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
          if (
            intersects[0].object.name === 'ring' ||
            intersects[0].object.name === 'sphere'
          ) {
            alert('HEY LISTEN!');
          }
        }
      },
      false
    );
    document.addEventListener('mousemove', (event) => {
      event.preventDefault();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      // find intersections
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);
      if (intersects.length > 0) {
        if (
          intersects[0].object.name === 'ring' ||
          intersects[0].object.name === 'sphere'
        ) {
          this.setState({
            STOP: true
          });
        }
      } else {
        this.setState({
          STOP: false
        });
      }
    });
    this.mainLoop();
  };

  mainLoop = () => {
    const { ADD, scene, camera, renderer, rings, STOP } = this.state;
    if (scene !== null && camera !== null && renderer !== null && rings.length > 0) {
      rings.map((ring) => {
        if (!STOP) {
          ring.position.z += ADD;
          if (ring.position.z <= -100 || ring.position.z >= -95) {
            this.setState({
              ADD: ADD * -1
            });
          }
        }
      });
      renderer.render(scene, camera);
    }
    requestAnimationFrame(this.mainLoop);
  };

  body = () => <div id="viewer"></div>;

  render() {
    return this.body();
  }
}

export default App;
