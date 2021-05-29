import * as THREE from 'three'
import React from 'react'
import { useBox } from '@react-three/cannon';
import textureImg from '../assets/images/smoke-2.png';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { useEffect } from 'react';


export const Cloud = (props) => {
    const [ref, api] = useBox(() => ({ ...props }))
    const texture = new THREE.TextureLoader().load(textureImg);
    const randomN = Math.floor((Math.random()*2));
    const vel = [1,-1];
    const dir = vel[randomN];

    useFrame(({ clock }) => {
        ref.current.rotation.z += clock.getElapsedTime()*0.02 * dir;
    })

    return(
        <mesh ref={ref}>
            <planeBufferGeometry attach="geometry" args={[5, 5]} />
            <meshLambertMaterial map={texture} transparent opacity={0.8} />
        </mesh>
    );
}