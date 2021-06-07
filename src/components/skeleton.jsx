import React, { Suspense, useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useFBX, useAnimations, useTexture } from '@react-three/drei';

import skelly from '../assets/characters/skeleton.fbx';
import atlas from '../assets/characters/TextureAtlas.png';

const IDLE = 'metarig|0_Idle';
const WALK = 'metarig|1_Walk';
const ATTACK = 'metarig|2_Attack';
const GET_HIT = 'metarig|3_GetHit';
const SKELETON_FOV = 0.33;


export const Skeleton = ({props, health, setHealth}) => {
  const fbx = useFBX(skelly);
  const texture = useTexture(atlas);
  const animations = fbx.animations;
  const skeletonSkinnedMesh = fbx.children[0];
  const group = useRef();
  const { actions } = useAnimations(animations, group);
  console.log(skeletonSkinnedMesh);

  const { camera } = useThree(); 

  const playerIsNear = () => {
    const position = group.current.position;
    const playerPosition = camera.position;
    const d = Math.pow(Math.pow(playerPosition.x - position.x, 2) + Math.pow(playerPosition.z - position.z, 2), 1/2);

    if (d <= SKELETON_FOV) {
      return true;
    } 
    return false;
  }

  useEffect(() => {
    
    actions[IDLE].play()
    setInterval(() => {
      if (playerIsNear()) {
        console.log('estas muy cerca vaquero');
      }
    }, 1000)
    
    
  }, [])

  useFrame(() => {
    
  });

  return  <Suspense dispose={null}>
    <mesh ref={group} {...props} dispose={null}>
      <group>
        <primitive object={fbx}/>
        <skinnedMesh 
          {...skeletonSkinnedMesh}/>
      </group>
    </mesh>
  </Suspense>
}