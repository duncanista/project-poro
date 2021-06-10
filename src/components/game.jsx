import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { Stars, Sky } from '@react-three/drei';

import { Ground } from './ground';
import { Player } from './player';
import { Camera } from './camera';
import { Cube } from './cube';

import { IntroductionMap } from '../maps/intro';
import { Model } from '../maps/Model.js';

import { PocMap } from '../maps/poc';
import { Menu } from './menu'
import { Skeleton } from './skeleton';
import { Chest } from './chest.js'
import { useUserStore } from '../store';
import Map from './Map'

export const Game = () => {
  return <>
    <Menu / >
    <Canvas shadowMap sRGB gl={{alpha: false, antialias: false}}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      <Camera fov={120}/>
      
      <ambientLight intensity={0.1}/>
      <pointLight castShadow intensity={0.8} position={[100, 100, 100]}/>
      <directionalLight intesnity={0.1} castShadow shadow-mapSize-height={512} shadow-mapSize-width={512}/>
      <Physics 
        iterations={20}
        tolerance={0.0001}
        gravity={[0, -30, 0]}>
        <Ground />
        <Suspense fallback={null}>    
          <PocMap/>
          <Chest position={[5,0,5]} r={[0,0,0]} />
          <Chest position={[5,0,6]} r={[0,0,0]}/>
          <Chest position={[6.4,0,5]} r={[0,Math.PI,0]}/>
          <Chest position={[6.4,0,6]} r={[0,Math.PI,0]}/>
        </Suspense>
        <Skeleton castShadow position={[5, 0.25, 1]} scale={0.0005}/>
        
        <Player position={[10.5, 0, 8.5]}/>
        { /*
        <Model />
          <Suspense fallback={null}>
            <Map position={[-50, 0.1, 0]} scale={3}/> 
            <Map2 position={[0, 0.1, 0]} scale={3}/>
          </Suspense>
        
        */}
      </Physics>
    </Canvas>
  </>
}