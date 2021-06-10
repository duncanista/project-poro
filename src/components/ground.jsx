import React from 'react';
import { usePlane } from '@react-three/cannon';

export const Ground = (props) => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0], ...props,
    args: [30, 30],
    position: [10, 0, 10],
    type: 'Static',
  }))

  return <>

    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attatch='geometry' args={[30, 30]}/>
      <meshPhongMaterial attach='material' transparent opacity={0}/>
    </mesh>
  </>
}