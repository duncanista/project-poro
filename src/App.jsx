import React, { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { useFBX } from '@react-three/drei';
import { Vector3 } from 'three';
import { Physics, useBox, useConvexPolyhedron } from '@react-three/cannon';

import { Ground } from './components/ground';
import Map from './components/Map.js';
import { Player } from './components/player';
import { Camera } from './components/camera';

import gltf_map from './components/map.glb'
import armor from './assets/ArmorStand.glb';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

const Map2 = (props) => {
  const gltf = useLoader(GLTFLoader, gltf_map);
  console.log('gltf, ', gltf);
  const nodes = gltf.nodes;

  return <>
    <primitive object={gltf.scene} {...props}/>
  </>
}

const ArmorStand = (props) => {
  let fbx = useFBX('/Armor_Stand.fbx')
  let node = fbx.children[0];
  let material = fbx.material;

  
  return <primitive object={fbx} {...props}/>
}

const App = () => {
  return (
    <div className='wrapper'>
      <Canvas shadowMap sRGB gl={{alpha: false, antialias: false}}>
        <Camera fov={90}/>
        
        <ambientLight intensity={0.1}/>
        
        <pointLight castShadow intensity={0.8} position={[100, 100, 100]}/>
        <Physics 
          iterations={20}
          tolerance={0.0001}
          gravity={[0, -30, 0]}
        >
          <Ground/>
          <ArmorStand position={[-2, 0, 0]} scale={3}/>
          
          <Player/>
          <Suspense fallback={null}>
          <Map position={[-50, 0.1, 0]} scale={3}/> 
          <Map2 position={[0, 0.1, 0]} scale={3}/>
        </Suspense>
        </Physics>
        
        
      </Canvas>
    </div>
  );
}

export default App;
