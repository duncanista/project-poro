import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Vector3 } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useFBX, useGLTF, useAnimations } from '@react-three/drei';
import { useBox } from '@react-three/cannon';

import { useUserStore } from '../store';

import skelly from '../assets/characters/skeleton.fbx';

const IDLE = 'metarig|0_Idle';
const WALK = 'metarig|1_Walk';
const ATTACK = 'metarig|3_Attack';
const GET_HIT = 'metarig|4_GetHit';
const SKELETON_FOV = 1.5;


export const Skeleton = (props) => {
  const group = useRef()
  const fbx = useFBX(skelly)
  const children = fbx.children;
  const animations = fbx.animations;
  const nodes = children[1].children;
  const skeletonSkinnedMesh = children[0];
  const { actions } = useAnimations(animations, group)
  const { position } = props;

  const { reduceUserHealth, userApi } = useUserStore((state) => ({ reduceUserHealth: state.reduceHealth, userApi: state.api }));
  const [health, setHealth] = useState(50);

  const [ref, api] = useBox(() => ({
    type: "Kinematic", 
    mass: 1,
    position,
    args: [0.18, 0.36, 0.18], 
    onCollide: (e) => {
      reduceUserHealth(20);
    },
    
  }));
  
  const { camera, scene } = useThree(); 

  const playerIsNear = () => {
    if(ref && ref.current){
      const position = ref.current.position;
      const playerPosition = camera.position;
      const d = Math.pow(Math.pow(playerPosition.x - position.x, 2) + Math.pow(playerPosition.z - position.z, 2), 1/2);

      if (d <= SKELETON_FOV) {
        actions[IDLE].stop();
        actions[ATTACK].play();
        return true;
      } 
      actions[ATTACK].stop();
      actions[IDLE].play();
      return false;
    }
  }

  useEffect(() => {
    actions[IDLE].play();
    setInterval(() => {
      if (playerIsNear()) {
        let x = camera.position.x - ref.current.position.x;
        let z = camera.position.z - ref.current.position.z;
        
        api.velocity.set(x*0.5, 0, z*0.5);
      }
      else{
        api.velocity.set(0, 0, 0);
      }
    }, 1000)
  }, [])

  useFrame(() => {
    ref.current.rotation.y = Math.atan2( ( camera.position.x - ref.current.position.x ), ( camera.position.z - ref.current.position.z ) );
    if (health < 0) {
      api.velocity.set(10, 0, 10);
      setHealth(50);
    }
  });

  return (
    <Suspense dispose={null}>
      
        <mesh ref={ref} position={position} dispose={null} onClick={(e) => {
          let x = -camera.position.x + ref.current.position.x;
          let z = -camera.position.z + ref.current.position.z;
          api.velocity.set(x*2.5, 0, z*2.5)
          setHealth(health - 10);
        }}>
          <group ref={group} scale={props.scale} dispose={null} >
            <primitive object={fbx}/>
            <skinnedMesh 
              {...skeletonSkinnedMesh}/>
          </group>
          <mesh>
            <boxBufferGeometry args={[0.18, 0.36, 0.18]} transparent opacity={0} />
            <meshNormalMaterial attach='material' transparent opacity={0}/>
  
          </mesh>
        </mesh>
      
    </Suspense>
  )
}