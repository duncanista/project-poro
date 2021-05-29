import React, { Suspense, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useFBX, useAnimations, useTexture } from '@react-three/drei';

import skelly from '../assets/characters/Armor_Stand.fbx';

const IDLE = 'metarig|0_Idle';
const WALK = 'metarig|1_Walk';
const ATTACK = 'metarig|2_Attack';
const GET_HIT = 'metarig|3_GetHit';

export const ArmorStand = (props) => {
  const fbx = useFBX(skelly);
  console.log("fbx",fbx);
  const armorStandMesh = fbx.children[0];
  const group = useRef();
  

  return  <Suspense dispose={null}>
    <mesh ref={group} {...props} dispose={null}>
      <group>
        <primitive object={fbx}/>
        <skinnedMesh 
          {...armorStandMesh}/>
      </group>
    </mesh>
  </Suspense>
}