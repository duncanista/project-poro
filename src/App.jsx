import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { useFBX } from '@react-three/drei';
import { Vector3 } from 'three';
import { Physics, useBox, useConvexPolyhedron, useSpring } from '@react-three/cannon';

import { Ground } from './components/ground';
import Map from './components/Map.js';
import { Player } from './components/player';
import { Camera } from './components/camera';

import gltf_map from './components/map.glb'
import armor from './assets/ArmorStand.glb';
import stair from './assets/Stair.glb';
import ALL_OBJECTS from './assets/Objects.glb';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { Geometry } from 'three-stdlib/deprecated/Geometry'

const Map2 = (props) => {
  const gltf = useLoader(GLTFLoader, gltf_map);
  console.log('gltf, ', gltf);
  const nodes = gltf.nodes;

  return <>
    <primitive object={gltf.scene} {...props}/>
  </>
}

const toConvexProps = (bufferGeometry) => {
  const geo = new Geometry().fromBufferGeometry(bufferGeometry)

  geo.mergeVertices()
  return [geo.vertices.map((v) => [v.x, v.y, v.z]), [], []]
}

function Cube(props) {
  const [ref] = useBox(() => ({ ...props, }))
  return (
    <mesh ref={ref}>
      <boxBufferGeometry />
    </mesh>
  )
}

const Prop = (props) => {
  const { name } = props;
  const gltf = useLoader(GLTFLoader, ALL_OBJECTS);
  const nodes = gltf.nodes;
  const node = nodes[name];
  const geo = useMemo(() => toConvexProps(node.geometry), [nodes])
  const [ref] = useConvexPolyhedron(() => ({ ...props, args: geo}))

    
  return <mesh 
    ref={ref} 
    castShadow 
    receiveShadow 
    geometry={node.geometry}
    { ...props } 
    dispose={null}>
    <meshNormalMaterial attach='material'/>
  </mesh> 
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
          <Ground receiveShadow/>
          <Suspense> 
            
            <Prop name={'Wall'} position={[0.5, 0, -0.8]} rotation={[0, - Math.PI / 2, 0]} mass={1}/>
            <Prop name={'Armor_Stand'} position={[1, 0, 1]} scale={1} mass={1}/> 
            
          </Suspense>
          <Cube mass={100} position={[0.5, 0, -1.5]}/>
          <Player position={[5, 5, 0]}/>
          { /*
            <Suspense fallback={null}>
              <Map position={[-50, 0.1, 0]} scale={3}/> 
              <Map2 position={[0, 0.1, 0]} scale={3}/>
            </Suspense>
          
          */}
        </Physics>
        
        
      </Canvas>
    </div>
  );
}

export default App;
