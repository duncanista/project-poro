import React from 'react'
import { useBox } from '@react-three/cannon';

export const Cube = (props) => {
  const [ref] = useBox(() => ({ ...props, }))
  return (
    <mesh ref={ref}>
      <boxBufferGeometry />
    </mesh>
  )
}