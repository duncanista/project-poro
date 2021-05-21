import React, { useEffect, useRef } from 'react';
import { Vector3 } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useSphere } from '@react-three/cannon'; 

import { PointerLockControls } from './pointer_lock_controls';
import { usePlayerControls } from '../hooks/usePlayerControls';

import SWORD from '../assets/Sword.glb';

const SPEED = 2.5;

export const Player = (props) => {
  const gltf = useGLTF(SWORD);
  const sword = gltf.nodes.Sword;

  const swordRef = useRef();
  
  const { camera } = useThree();

  const {
    moveForward,
    moveBackwards,
    moveLeft,
    moveRight,
    jump
  } = usePlayerControls();

  const [ref, api] = useSphere(() => ({
    mass: 1, 
    type: 'Dynamic',
    args: 0.25,
    ...props
  }));
  
  const velocity = useRef([0, 0, 0]);

  useEffect(() => {
    api.velocity.subscribe(v => velocity.current = v)
  }, [api.velocity])



  useFrame(() => {

    const position = new Vector3(ref.current.position.x, ref.current.position.y, ref.current.position.z);
    camera.position.copy(position);
    
    const direction = new Vector3();

    const frontVector = new Vector3(0, 0, Number(moveBackwards) - Number(moveForward));
    const sideVector = new Vector3(Number(moveLeft) - Number(moveRight), 0, 0);

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);
  
    api.velocity.set(direction.x, velocity.current[1], direction.z);

    if(jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05) {
      api.velocity.set(velocity.current[0], 5, velocity.current[2]);
    }
  });

  return (<>
      <PointerLockControls />
      <mesh ref={ref} castShadow>
      <sphereBufferGeometry attach="geometry" args={[0.1, 5, 5]} />
        <meshStandardMaterial wireframe />
      </mesh>
       
      
      
    </>
  );
}