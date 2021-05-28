import React, { Suspense, useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

import { Prop2 } from '../components/prop'

import map from '../components/map.glb';

var fs = require('fs');

export const PocMap = (props) => {
  const gltf = useGLTF(map);
  console.log('poc map', gltf);
  //const elements = scene.children[0].children;
  //console.log(elements);

  return  <Suspense dispose={null}>
    <group position={[10, 0, -10]} {...props}>
      { 
        [].map(node => {
          const name = node[0]
          const element = node[1]
          if (name == 'Ceiling') {
            return (<></>)
          } else {
            return (<primitive object={element} />)
          }
        })
      }
      <primitive object={gltf.scene}/>
    </group>
  </Suspense>
}