import React, { useRef, Suspense, useEffect} from 'react'
import { useGLTF } from '@react-three/drei'
import { extend, useFrame, useThree } from '@react-three/fiber';

export const Sword = (props) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/Sword.glb')

  useFrame(({ clock }) => {
    group.current.position.y += 0.001*Math.cos(clock.getElapsedTime());
  })
  

  return (
    <Suspense  fallback={null}>
      <group ref={group} {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sword.geometry}
          material={materials['Texture.003']}
          position={[2.62, 0.01, -1.96]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        />
      </group>
    </Suspense>
  )
}