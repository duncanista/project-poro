
import React, { useRef, Suspense, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useBox } from '@react-three/cannon';

import { useUserStore } from '../store'; 

export const Chest = (props) => {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/chest.glb')
  const { actions } = useAnimations(animations, group)
  const { position, r } = props;
  const [ref, api] = useBox(() => ({
    type: "Kinematic", 
    position,
    mass: 1,
    args: [0.2, 0.4, 0.4],
  }));

  const [clicked, setClicked] = useState(false);
  const { increaseLoot } = useUserStore((state) => ({ increaseLoot: state.increaseLoot }));

  return (
    <Suspense dispose={null}>
      <mesh ref={ref} visible={!clicked} position={position} dispose={null} onClick={(e) => {
        console.log('clicaste cofre');
        setClicked(true);
        increaseLoot(1);
      }}>
        <group ref={group} dispose={null}>
          <group rotation={r}>
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
      
        <boxBufferGeometry args={[0.2, 0.4, 0.4]} />
        <meshNormalMaterial attach='material' transparent opacity={0}/>
      
    </mesh>
    </Suspense>
  )
}



