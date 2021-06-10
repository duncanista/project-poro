import React, {Suspense} from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from "@react-three/cannon";
import { Cloud } from "./cloud";
import SWORDGLTF from '../assets/Sword.glb';
import { useGLTF, Stars } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';


import aSrc from '../assets/images/a.png';
import sSrc from '../assets/images/s.png';
import dSrc from '../assets/images/d.png';
import wSrc from '../assets/images/w.png';
import potionSrc from '../assets/images/potion-2.png';
import closeSrc from '../assets/images/close.png';
import theme from '../assets/sounds/start.mp3';

import { useEffect, useRef } from 'react';
import '../assets/css/styles.css';

import { useGameStore } from '../store';

const Sword = (props) => {
  const gltf = useGLTF(SWORDGLTF);
  const a = useRef()
  
  useEffect(()=> {
    gltf.scene.castShadow = true;
  })
  useFrame(({clock}) => {
     a.current.position.y += Math.cos(clock.getElapsedTime()) * 0.0005;  
  })
  return <Suspense fallback={<Cloud />}>
    <mesh castShadow ref={a} position={[-0.3,-2.68,6.6]} rotation={[0, 0, Math.PI/2]} >  
      <group>
        <primitive object={gltf.scene}    />
      </group>
    </mesh> 
  </Suspense>
}

export const Start = () => {
  const { setNewGame } = useGameStore(state => ({ setNewGame: state.setNewGame }));
  const tutorial = useRef();
  const credits = useRef();
  const audio = new Audio(theme);


  const startNewGame = () => {
    setNewGame(true);
  }  
  const displayTutorial  = () => {
    tutorial.current.hidden = false;
    credits.current.hidden = true;
  }
  const close  = () => {
    tutorial.current.hidden = true;
    credits.current.hidden = true;

  }

  const displayCredits  = () => {
    credits.current.hidden = false;
    tutorial.current.hidden = true;

  }
 
  useEffect(() => {
    tutorial.current.hidden = true;
    credits.current.hidden = true;
    audio.play();
  });
  return (<>
    <audio src={theme}/>
    <h1 className="overlay" onClick={startNewGame} style={{ backgroundColor: 'transparent', position: 'absolute', top:'70%', left: '82%', zIndex: 100,  fontFamily:'dungeon'}} >Start Game</h1>
    <h1 className="overlay" onClick={displayCredits} style={{backgroundColor: 'transparent', position: 'absolute', top:'77%', left: '82%', zIndex: 100,  fontFamily:'dungeon'}} >Credits</h1>
    <h1  className="overlay" onClick={displayTutorial}  style={{backgroundColor: 'transparent', position: 'absolute', top:'84%', left: '82%', zIndex: 100,  fontFamily:'dungeon'}} >Tutorial</h1>
    <h1  style={{position: 'absolute', top:'5%', left: '5%', zIndex: 1,  fontFamily:'dungeon',color:'white', fontSize:'128px'}} >ProjecT PorO</h1>

    <div ref={tutorial} className="cui" style={{position: 'absolute', zIndex: 100, top:'5%'}} >
      <h1 style={{position: 'absolute', left: '2%', top:'3%', zIndex: 1,  fontFamily:'dungeon',color:'white', fontSize:'64px', width:'40%'}} >How to play?</h1>
      <img  onClick={close} src={closeSrc} style={{position: 'absolute', top:'5%', left: '92%', zIndex: 100, width:'4%', opacity:'0.55'}} />

      <h4  style={{position: 'absolute', left: '3%', top: '15%', zIndex: 1,  fontFamily:'dungeon',color:'white', fontSize:'50px'}} >Controls</h4>
      <img src={aSrc} style={{position: 'absolute', top:'35%', left: '3%', width:'6.2%', zIndex: 100  }} />
      <img src={sSrc} style={{position: 'absolute', top:'35%', left: '10%',width:'5.7%', zIndex: 100, }} />
      <img src={dSrc} style={{position: 'absolute', top:'35.2%', left: '17%',width:'6%', zIndex: 100, }} />
      <img src={wSrc} style={{position: 'absolute', top:'23%', left: '10%',width:'6%', zIndex: 100}} />
      <h4  style={{position: 'absolute', left: '3%', top: '45%', zIndex: 1,  fontFamily:'dungeon',color:'white', fontSize:'32px'}} >Move</h4>
    </div>

    <div ref={credits} className="credits" style={{position: 'absolute', zIndex: 100, top:'5%'}} >
      <h1 style={{position: 'absolute', left: '2%', top:'5%', zIndex: 1,  fontFamily:'dungeon',color:'white', fontSize:'64px', width:'40%'}} >Made by</h1>
      <img  onClick={close} src={closeSrc} style={{position: 'absolute', top:'5%', left: '92%', zIndex: 100, width:'4%', opacity:'0.55'}} />
     
      <h4  style={{position: 'absolute', left: '3%', top: '30%', zIndex: 1,  fontFamily:'dungeon',color:'white', fontSize:'32px'}} >Jordan Gonzalez Bustamante</h4>
      <h4  style={{position: 'absolute', left: '3%', top: '55%', zIndex: 1,  fontFamily:'dungeon',color:'white', fontSize:'32px'}} >Luis Alfonso Alcantara Lopez Ortega</h4>
      
    </div>
    <Canvas shadowMap sRGB gl={{alpha: false, antialias: false}}>  
    <fog attach="fog" args={["white", 0, 20]} />
    <Stars  />
  
      <Physics position={[3, 0, 1]} gravity={[0, 0, 0]}>

        <Cloud position={[-0, -5, 0]} rotation={[0,0,0]} />
        <Cloud position={[-1, -5, 0]} rotation={[0,0,0]} />
        <Cloud position={[-4, -5, 0]} rotation={[0,0,0]} />
        <Cloud position={[-3.5, -5, -1]} rotation={[0,0,0]} />
        <Cloud position={[-5, -5, -1]} rotation={[0,0,0]} />
        <Cloud position={[-7.5, -5.5, -1]} rotation={[0,0,0]} />
        <Cloud position={[0, -5, 0]} rotation={[0,0,0]} />
        <Cloud position={[1.5, -5, -1]} rotation={[0,0,0]} />
        <Cloud position={[3.5, -5, -1]} rotation={[0,0,0]} />
        <Cloud position={[4, -5, -1]} rotation={[0,0,0]} />
        <Cloud position={[7.5, -5.5, -1]} rotation={[0,0,0]} />
 
      </Physics>
      <ambientLight intensity={0.1} />
      <pointLight  intensity={0.7} position={[0, 2, 5]} />
      <Suspense fallback={null}>
        <Sword />
      </Suspense> 
    </Canvas>
  </>);
}