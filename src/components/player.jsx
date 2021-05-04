import React, { useEffect, useRef } from 'react';
import { Vector3 } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon'; 

import { PointerLockControls } from './pointer_lock_controls';
import { usePlayerControls } from '../hooks/usePlayerControls';

const SPEED = 5;

export const Player = (props) => {
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
    position: [0, 10, 0],
    ...props
  }));
  
  const velocity = useRef([0, 0, 0]);

  useEffect(() => {
    api.velocity.subscribe(v => velocity.current = v)
  }, [api.velocity])

  useFrame(() => {
    camera.position.copy(ref.current.position);
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
    <mesh ref={ref} />
    </>
  );
}