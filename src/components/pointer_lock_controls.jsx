import React, { useEffect, useRef } from 'react';
import { extend, useThree } from '@react-three/fiber';
import { PointerLockControls as PointerLockControlsImpl } from 'three/examples/jsm/controls/PointerLockControls';

extend({ PointerLockControlsImpl });

export const PointerLockControls = (props) => {
  const { camera, gl } = useThree();
  const controls = useRef();

  useEffect(() => {
    if (controls && controls.current != null){
      document.addEventListener('click', () => {
        controls.current.lock();
        console.log('locked');
      });
    }
  }, []);

  return <pointerLockControlsImpl 
    ref={controls} 
    args={[camera, gl.domElement]}
    {...props}  
  />
}