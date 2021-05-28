import * as THREE from 'three'
import React from 'react'
import { useBox } from '@react-three/cannon';
import textureImg from './assets/smoke-1.png';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { useEffect } from 'react';


export const Cloud = (props) => {
    const [ref, api] = useBox(() => ({ ...props }))
    const texture = new THREE.TextureLoader().load(textureImg);
    const randomN = Math.floor((Math.random()*2));
    const vel = [1,-1];
    const dir = vel[randomN];

    useFrame(({ clock }) => {
        
        console.log(ref.current.rotation);
        ref.current.rotation.z += clock.getElapsedTime()*0.02 * dir;
    })

    return(
        <mesh ref={ref}>
            <planeBufferGeometry attach="geometry" args={[10, 5]} />
            <meshLambertMaterial map={texture} transparent opacity={0.8} />
        </mesh>
    );
}