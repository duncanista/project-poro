import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';

import { Ground } from './ground';
import { Player } from './player';
import { Camera } from './camera';
import { Cube } from './cube';

import { IntroductionMap } from '../maps/intro';
import { PocMap } from '../maps/poc';
import { Menu } from './menu'
import { Skeleton } from './skeleton';

import { useGame } from '../providers/game_provider';

export const Game = () => {
  const { health, setHealth } = useGame();
  return <>
    <Menu / >
    <button id='lockButton' style={{position: 'absolute', top: '55%', left: '5%', zIndex: 100}}>Lockear</button>
    <Canvas shadowMap sRGB gl={{alpha: false, antialias: false}}>
      <Camera fov={120}/>
      
      <ambientLight intensity={0.1}/>
      
      <pointLight castShadow intensity={0.8} position={[100, 100, 100]}/>
      <Physics 
        iterations={20}
        tolerance={0.0001}
        gravity={[0, -30, 0]}>
        <Ground receiveShadow position={[0, -0.01, 0]}/>
        <Suspense fallback={null}>   
          <IntroductionMap/> 
          <PocMap/>
          <Cube mass={1} args={[1, 1, 1]} position={[4, 0.5, -1.5]} color='#f1f1f1'/>
        </Suspense>
        <Skeleton props={{position: [1, 0.25, 1], scale: 0.0005}} setHealth={setHealth} health={health}/>

        <Player position={[0, 0, 0]}/>
        { /*
          <Suspense fallback={null}>
            <Map position={[-50, 0.1, 0]} scale={3}/> 
            <Map2 position={[0, 0.1, 0]} scale={3}/>
          </Suspense>
        
        */}
      </Physics>
    </Canvas>
  </>
}