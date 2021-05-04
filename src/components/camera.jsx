import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';

export const Camera = (props) => {
  const ref = useRef();
  const { set } = useThree();

  useEffect(() => {
    set(ref.current);
  }, [])

  return <perspectiveCamera ref={ref} {...props}/>
}