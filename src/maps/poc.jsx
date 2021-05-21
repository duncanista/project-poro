import React, { Suspense } from 'react';
import { useGLTF } from '@react-three/drei';

import { Prop } from '../components/prop'

import map from '../components/map.glb';

export const PocMap = (props) => {
  const gltf = useGLTF(map);
  const nodes = gltf.nodes;
  console.log('poc map', gltf);


  return <Suspense dispose={null}>
    <group position={[10, 0, -10]} {...props}>
      { 
        Object.entries(nodes).map(node => {
          const object = node[1];
          const name = node[0];
          if (name != 'Ceiling'){
            return <primitive object={object}/>
          } else {
            return <></>
          }
          
        })
      }
      
    </group>
  </Suspense>
}