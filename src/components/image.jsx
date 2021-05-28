import * as THREE from 'three'
import React from 'react'
import { useBox } from '@react-three/cannon';
import textureImg from './assets/game-1.png';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { useEffect } from 'react';


export const Image = (props) => {
    const [ref, api] = useBox(() => ({ ...props }))
    const texture = new THREE.TextureLoader().load(props.image);
    const randomN = Math.floor((Math.random()*4));
    const vel = [0.3, 0.4, -0.4, -0.3];
    /* useFrame(({ clock }) => {
        ref.current.rotation.z += clock.getElapsedTime() * vel[randomN] / 35;
    }) */

    return(
        <mesh ref={ref}>
            <planeBufferGeometry attach="geometry" args={[10, 5]} />
            <meshLambertMaterial map={texture} transparent/>
        </mesh>
    );
}