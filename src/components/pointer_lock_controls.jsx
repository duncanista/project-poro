import React, { useEffect, useRef } from 'react';
import { extend, useFrame, useThree } from '@react-three/fiber';

import { useGLTF } from '@react-three/drei';
import { PointerLockControls as PointerLockControlsImpl } from 'three/examples/jsm/controls/PointerLockControls';
import SWORD from '../assets/Sword.glb';
extend({ PointerLockControlsImpl });




export const PointerLockControls = (props) => {
  const gltf = useGLTF(SWORD);
  const sword = gltf.nodes.Sword;
  const { camera, gl, scene } = useThree();
  const controls = useRef();

  

  useEffect(() => {
    if (controls && controls.current != null){
      document.addEventListener('click', () => {
        controls.current.lock();
        console.log('locked');
      });
    }
    sword.position.set(0.15, 0, -0.25);
    sword.rotation.set(Math.PI/2, Math.PI/5, Math.PI/4)
    
    camera.add(sword);
    scene.add(camera);
    console.log(camera)
  }, []);

  return <pointerLockControlsImpl 
    ref={controls} 
    args={[camera, gl.domElement]}
    {...props}  
  />
}