import React from 'react'
import { useBox } from '@react-three/cannon';

export const Cube = (props) => {
  const [ref] = useBox(() => ({ ...props, type: 'Static' }))
  const { args } = props;
  return (
    <mesh ref={ref} receiveShadow castShadow >
      <boxBufferGeometry args={args} />
      <meshNormalMaterial attach='material' />
    </mesh>
  )
}