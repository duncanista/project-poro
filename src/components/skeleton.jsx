import React, { Suspense, useRef, useEffect } from 'react';
import { Vector3 } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useFBX, useGLTF, useAnimations } from '@react-three/drei';
import { useBox } from '@react-three/cannon';

import skelly from '../assets/characters/skeleton.fbx';

const IDLE = 'metarig|0_Idle';
const WALK = 'metarig|1_Walk';
const ATTACK = 'metarig|3_Attack';
const GET_HIT = 'metarig|4_GetHit';
const SKELETON_FOV = 0.5;


export const Skeleton = ({props, health, setHealth}) => {
  const group = useRef()
  const fbx = useFBX(skelly)
  const children = fbx.children;
  const animations = fbx.animations;
  const nodes = children[1].children;
  const skeletonSkinnedMesh = children[0];
  const { actions } = useAnimations(animations, group)
  const { position } = props;
  const [ref, api] = useBox(() => ({
    type: "Kinematic", 
    position, 
    args: [0.18, 0.18, 0.18], 
    onCollide: (e) => console.log('eee verga chocamos') 
  }));
  
  const { camera } = useThree(); 

  const playerIsNear = () => {
    const position = ref.current.position;
    const playerPosition = camera.position;
    const d = Math.pow(Math.pow(playerPosition.x - position.x, 2) + Math.pow(playerPosition.z - position.z, 2), 1/2);

    if (d <= SKELETON_FOV) {
      return true;
    } 
    return false;
  }

  useEffect(() => {
    
    actions[ATTACK].play()
    setInterval(() => {
      if (playerIsNear()) {
        console.log('estas muy cerca vaquero');
        console.log(camera.position);
      }
    }, 1000)
    
    
  }, [])

  useFrame(() => {
    const delta = Date.now() * 0.05
    if (playerIsNear()) {
      const player = camera.position;
      const direction = new Vector3();
      direction
        .subVectors(player)
        .normalize()
        .multiplyScalar(1.5)
        .applyEuler(camera.rotation);



      ref.current.position.x += direction.x * delta
      ref.current.position.z += direction.z * delta
    }
  });

  return (
    <Suspense dispose={null}>
      <mesh ref={ref} position={position} dispose={null}>
        <group ref={group} scale={props.scale} dispose={null}>
          <primitive object={fbx}/>
          <skinnedMesh 
            {...skeletonSkinnedMesh}/>
        </group>
        <boxBufferGeometry args={[0.18, 0.18, 0.18]}/>
      </mesh>
      
    </Suspense>
  )
}