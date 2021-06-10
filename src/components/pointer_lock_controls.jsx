import React, { useEffect, useRef, useState } from 'react';
import { extend, useFrame, useThree } from '@react-three/fiber';

import { useGLTF } from '@react-three/drei';
import { PointerLockControls as PointerLockControlsImpl } from 'three/examples/jsm/controls/PointerLockControls';
import { useGameStore } from '../store';

import SWORD from '../assets/Sword.glb';
import { useGame } from '../providers/game_provider';

extend({ PointerLockControlsImpl });
let timeAux = 0; 
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
          timeAux = Date.now();
          sword.rotation.set(0, Math.PI/2.1, (Math.PI/2.1)+0.5);
      }
    });
    
  }, [locked])

  useFrame(({clock}) => {
    const time = Date.now() * 0.0005
    const b = Date.now();
    if (hitting) {
      let radians = (b-timeAux) * (Math.PI/180);
      sword.position.z -= 0.045*Math.cos(radians/1.7);

      setTimeout(() => {
        setHitting(false);
        sword.position.set(0.15, 0, -0.25);

      }, 500);
    } else {
      sword.rotation.set(Math.PI/2.5, Math.PI/2.1, Math.PI/2.1)
      sword.position.x = 0.15;

      sword.position.y = Math.sin(time * 4 + camera.position.x + camera.position.z)*0.01
    }
  })

  return <pointerLockControlsImpl 
    ref={controls} 
    args={[camera, gl.domElement]}
    {...props}  
  />
}