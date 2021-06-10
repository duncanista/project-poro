
import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useBox } from '@react-three/cannon';

export const Chest = (props) => {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/chest.glb')
  const { actions } = useAnimations(animations, group)

  const [ref, api] = useBox(() => ({
    type: "Kinematic", 
    mass: 1,
    args: [1, 1, 1],
    
  }));

  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[1.84, 0, -2.51]} rotation={props.r} onClick={(e) => {
          // todo change loot
          console.log("agarre cofre")
      }}>
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



