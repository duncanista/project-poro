
import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export const Chest = (props) => {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/chest.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[1.84, 0, -2.51]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Golden_Chest.geometry}
          material={nodes.Golden_Chest.material}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Golden_Chest_Top.geometry}
            material={nodes.Golden_Chest_Top.material}
            position={[-0.09, 0.13, 0]}
          />
        </mesh>
      </group>
    </group>
  )
}



