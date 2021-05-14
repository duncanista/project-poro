import React, { Suspense } from 'react';
import { useGLTF } from '@react-three/drei';

import { Prop } from '../components/prop'

import allObjects from '../assets/Objects.glb';
import map from '../assets/IntroductionMapDup.glb';

export const IntroductionMap = (props) => {
  const gltf = useGLTF(map);
  const obj = useGLTF(allObjects);
  const nodes = obj.nodes;

  console.log(gltf)
  console.log(nodes);

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
      <primitive object={gltf.scene} position={[-20, 0, 0]} />
      <Prop props={{position: [-5, 0, 0], mass: 1}} nodes={nodes} name={'Armor_Stand'} physics />
      <Prop 
        props={{position: [-2, 0.1, 0], mass: 100}} 
        nodes={nodes} 
        name={'Ground_Tiles_Large'} physics />
       
        

    
    </group>
  </Suspense>
}

