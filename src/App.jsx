import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';

import { Ground } from './components/ground';
import { Player } from './components/player';
import { Camera } from './components/camera';
import { Cube } from './components/cube';

import { IntroductionMap } from './maps/intro';
import { PocMap } from './maps/poc';

const App = () => {
  
  return (
    <div className='wrapper'>
      <Canvas shadowMap sRGB gl={{alpha: false, antialias: false}}>
        <Camera fov={90}/>
        
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
            <Cube mass={1} position={[4, 0, -1.5]} color='#f1f1f1'/>
          </Suspense>
          
          <Player position={[0, 0, 0]}/>
          { /*
            <Suspense fallback={null}>
              <Map position={[-50, 0.1, 0]} scale={3}/> 
              <Map2 position={[0, 0.1, 0]} scale={3}/>
            </Suspense>
          
          */}
        </Physics>
        
        
      </Canvas>
    </div>
  );
}

export default App;
