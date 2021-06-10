import React from 'react';
import { usePlane } from '@react-three/cannon';

export const Ground = (props) => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0], ...props,
    type: 'Static',
  }))

  return <>
   <gridHelper args={[500, 500]}/>
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attatch='geometry' args={[1000, 1000]}/>
      <meshPhongMaterial attach='material' color=''/>
    </mesh>
  </>
}