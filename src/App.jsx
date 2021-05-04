import React, { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { Vector3 } from 'three';
import { Physics } from '@react-three/cannon';

import { Ground } from './components/ground';
import Map from './components/Map.js';
import { Player } from './components/player';
import { Camera } from './components/camera';

import gltf_map from './components/map.glb'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Map2 = () => {
  const gltf = useLoader(GLTFLoader, gltf_map);
  return <primitive object={gltf.scene} position={[0, 0.1, 0]} scale={3}/>
}

const App = () => {
  return (
    <div className='wrapper'>
      <Canvas shadowMap sRGB gl={{alpha: false}}>
        <Camera fov={90}/>
        <Sky sunPosition={new Vector3(100, 10, 100)}/>
        <ambientLight intensity={0.3}/>
        <pointLight castShadow intensity={0.8} position={[100, 100, 100]}/>
        <Physics>
          <Ground/>
          
          <Player/>
        </Physics>
        <Suspense fallback={null}>
          { /* <Map position={[0, 0.1, 0]} scale={3}/> */ }
          <Map2 />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
