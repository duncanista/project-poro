import React, { Suspense } from 'react';
import { useGLTF } from '@react-three/drei';

import { Prop } from '../components/prop'

import map from '../components/map.glb';

export const PocMap = (props) => {
  const gltf = useGLTF(map);
  const nodes = gltf.nodes;

  return <Suspense dispose={null}>
    <group position={[-10, 0, -10]} {...props}>
      
      <primitive object={gltf.scene}/>
    </group>
  </Suspense>
}