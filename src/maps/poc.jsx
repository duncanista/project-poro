import React, { Suspense } from 'react';
import { useGLTF } from '@react-three/drei';
import { useBox } from '@react-three/cannon'

import map from './map.glb';
import { Cube } from '../components/cube'

export const PocMap = (props) => {
  const gltf = useGLTF(map);
  console.log('poc map', gltf);

  const elements = gltf.scene.children[0].children;
  console.log(elements);

  return  <Suspense dispose={null}>
    <group position={[10, 0, 10]} {...props}>
      <primitive object={gltf.scene}/>
    </group>
    <Cube mass={1} args={[1.5, 1, 7.2]} position={[5.5, 0.5, 1.5]}/>
    <Cube mass={1} args={[1.25, 1, 7.2]} position={[9.5, 0.5, 1.5]}/>

    <Cube mass={1} args={[7.2, 1, 1.2]} position={[11.5, 0.5, 1.5]}/>
    <Cube mass={1} args={[3.2, 1, 1.2]} position={[13.5, 0.5, 5.5]}/>
    <Cube mass={1} args={[2.2, 1, 0.2]} position={[11, 0.5, 5]}/>

    <Cube mass={1} args={[1, 1, 4.2]} position={[4.5, 0.5, -3]}/>
    <Cube mass={1} args={[1, 1, 4.2]} position={[10.5, 0.5, -3]}/>

    <Cube mass={1} args={[5, 1, 1.2]} position={[7.5, 0.5, -4.5]}/>
    
    <Cube mass={1} args={[0.2, 10, 0.2]} position={[0, 0, 0]}/>
  </Suspense>
}