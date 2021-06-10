import React,{Suspense} from 'react'
import {  useFrame } from '@react-three/fiber';
import { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import SWORDGLTF from '../assets/Sword.glb';
import {  useRef } from 'react';


export const Sword = (props) => {
    const gltf = useGLTF(SWORDGLTF);
    const a = useRef()

    useEffect(()=> {
        gltf.scene.castShadow = true;
      }) 
      useFrame(({clock}) => {
         a.current.position.y += Math.cos(clock.getElapsedTime()) * 0.0005;  
      })
      return <Suspense fallback={null}>
        <mesh castShadow ref={a} position={[-0.3,-2.68,6.6]} rotation={[0, 0, Math.PI/2]} >  
          <group>
            <primitive object={gltf.scene}    />
          </group>
        </mesh> 
      </Suspense>
}