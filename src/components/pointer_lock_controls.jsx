import React, { useEffect, useRef, useState } from 'react';
import { extend, useFrame, useThree } from '@react-three/fiber';

import { useGLTF } from '@react-three/drei';
import { PointerLockControls as PointerLockControlsImpl } from 'three/examples/jsm/controls/PointerLockControls';
import { useGameStore } from '../store';

import SWORD from '../assets/Sword.glb';
import { useGame } from '../providers/game_provider';

extend({ PointerLockControlsImpl });

export const PointerLockControls = (props) => {
  const gltf = useGLTF(SWORD);
  const sword = gltf.nodes.Sword;
  const { camera, gl, scene } = useThree();
  const { pauseScreen } = useGameStore(state => ({ pauseScreen: state.refs.pauseScreen }));
  const controls = useRef();

  const [locked, setLocked] = useState(false);
  const [hitting, setHitting] = useState(false);


  useEffect(() => {
    if (controls.current) {
      useGameStore.setState((state) => ({
        refs: {
          ...state.refs,
          controls: controls.current
        }
      }))
      console.log('los controles se cargaron');
    }
  }, [controls]);

  useEffect(() => {
    if (controls && controls.current){
      controls.current.addEventListener('lock', () => {
        setLocked(true);
      });

      controls.current.addEventListener('unlock', () => {
        console.log('unlocked with esc');
        pauseScreen.hidden = false;
        setLocked(false);
      });

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
          setHitting(true);
      }
    });
    
  }, [locked])

  useFrame(() => {
    const time = Date.now() * 0.0005
    if (hitting) {
      sword.rotation.z -= 0.05
      sword.position.z -= 0.005
      setTimeout(() => {
        setHitting(false);
        sword.rotation.set(Math.PI/2.5, Math.PI/2.1, Math.PI/2.1)
        sword.position.set(0.15, 0, -0.25);
      }, 500);
    } else {
      sword.position.y = Math.sin(time * 4 + camera.position.x + camera.position.z)*0.01
    }
  })

  return <pointerLockControlsImpl 
    ref={controls} 
    args={[camera, gl.domElement]}
    {...props}  
  />
}