import React from 'react'
import { useBox } from '@react-three/cannon';

export const Cube = (props) => {
  const [ref] = useBox(() => ({ ...props, type: 'Static' }))
  return (
    <mesh ref={ref} >
      <boxBufferGeometry />
      <meshNormalMaterial attach='material'/>
    </mesh>
  )
}