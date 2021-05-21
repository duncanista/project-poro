import React, { useEffect, useRef, useState } from 'react';
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

  const [locked, setLocked] = useState(false);

  const lockButton = document.getElementById('lockButton');

  useEffect(() => {
    if (controls && controls.current != null){
      controls.current.addEventListener('lock', () => {
        setLocked(true);
      });

      controls.current.addEventListener('unlock', () => {
        console.log('unlocked with esc');
        setLocked(false);
      });

      lockButton.addEventListener('click', () => {
        controls.current.lock();
      })

    }
    sword.position.set(0.15, 0, -0.25);
    sword.rotation.set(Math.PI/2.5, Math.PI/2.1, Math.PI/2.1)
    
    camera.add(sword);
    scene.add(camera);
  }, []);

  useEffect(() => {
    document.addEventListener('click', () => {
      if(locked) {
        console.log('estoy pegando con la espada');
      }
    });
    
  }, [locked])

  useFrame(() => {
    const time = Date.now() * 0.0005
    sword.position.y = Math.sin(time * 4 + camera.position.x + camera.position.z)*0.01 
  })

  return <pointerLockControlsImpl 
    ref={controls} 
    args={[camera, gl.domElement]}
    {...props}  
  />
}