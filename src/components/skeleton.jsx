import React, { Suspense, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useFBX, useAnimations, useTexture } from '@react-three/drei';

import skelly from '../assets/characters/skeleton.fbx';
import atlas from '../assets/characters/TextureAtlas.png';

const IDLE = 'metarig|0_Idle';
const WALK = 'metarig|1_Walk';
const ATTACK = 'metarig|2_Attack';
const GET_HIT = 'metarig|3_GetHit';

export const Skeleton = (props) => {
  const fbx = useFBX(skelly);
  const texture = useTexture(atlas);
  const animations = fbx.animations;
  const skeletonSkinnedMesh = fbx.children[0];
  const group = useRef();
  const { actions } = useAnimations(animations, group);
  console.log(skeletonSkinnedMesh);
  useEffect(() => {
    actions[IDLE].play()
  }, [])

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