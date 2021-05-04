import React from 'react';
import { usePlane } from '@react-three/cannon';

export const Ground = (props) => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0], ...props
  }))

  return <>
    <gridHelper args={[1000, 1000]}/>
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attatch='geomtry' args={[1000, 1000]}/>
      <meshPhongMaterial attach='material' color='#999999'/>
    </mesh>
  </>
}