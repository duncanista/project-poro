import React, { Suspense } from 'react';
import { useGLTF } from '@react-three/drei';

import { useBox } from '@react-three/cannon';

import { Prop } from '../components/prop'

import allObjects from '../assets/Objects.glb';
import map from '../assets/IntroductionMapDup.glb';

export const IntroductionMap = (props) => {
  const gltf = useGLTF(map);
  const obj = useGLTF(allObjects);
  const nodes = obj.nodes;

  const [ref, api] = useBox(() => ({
    type: "Static", 
    mass: 1,
    position: [0, 0, 0.5],
    args: [0.1, 1.3, 3], 
  }));

  const [ref2, api2] = useBox(() => ({
    type: "Static", 
    mass: 1,
    position: [-2, 0, 0.5],
    args: [0.1, 1.3, 3], 
  }));

  // console.log("All objects", obj);
  const Ground = (props) => {
    const groundGroup = gltf.nodes.Ground_Large;
    const tiles = groundGroup.children;

    return <group {...props}>
      <Prop 
        nodes={tiles} 
        props={{position: tiles[0].position, 
        name: tiles[0].name, mass: 1}} 
        name={0} 
        geometry={tiles[0].geometry} physics />
    </group>
  }

  return <Suspense dispose={null}>
    <group {...props}>
      <primitive object={obj.scene} position={[-10, 0, 0]} />
      <primitive object={gltf.scene} position={[0, 0, 0]} />
      <mesh ref={ref} dispose={null}>
        <boxBufferGeometry args={[0.1, 1.3, 3]} />
        <meshNormalMaterial attach='material'/>
      </mesh>

      <mesh ref={ref2} dispose={null}>
        <boxBufferGeometry args={[0.1, 1.3, 3]} />
        <meshNormalMaterial attach='material'/>
      </mesh>
    </group>
  </Suspense>
}

