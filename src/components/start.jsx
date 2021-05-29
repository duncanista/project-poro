import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics, useBox, usePlane } from "@react-three/cannon";
import { Cloud } from "./cloud";
import swordSrc from '../assets/images/sword-3.png';
import keySrc from '../assets/images/keyboard-white.png';
import mouseSrc from '../assets/images/mouse.png';

import chestSrc from '../assets/images/chest-3.png';
import potionSrc from '../assets/images/potion-2.png';
import closeSrc from '../assets/images/close.png';

import { useEffect, useRef } from 'react';
import '../assets/css/styles.css';

import { useGame } from '../providers/game_provider';

export const Start = () => {
  const { setNewGame } = useGame();
  const tutorial = useRef();
  const credits = useRef();

  const startNewGame = () => {
    console.log("hello");
    setNewGame(true);
  }  
  const displayTutorial  = () => {
    console.log("hello");
    tutorial.current.hidden = false;
    credits.current.hidden = true;
  }
  const closeTutorial  = () => {
    console.log("hello");
    tutorial.current.hidden = true;
  }

  const displayCredits  = () => {
    console.log("hello");
    credits.current.hidden = false;
    tutorial.current.hidden = true;

  }
  const closeCredits  = () => {
    console.log("hello");
    credits.current.hidden = true;
  }

  useEffect(() => {
    tutorial.current.hidden = true;
    credits.current.hidden = true;
  });
  return (<>

    <h1 className="overlay" onClick={startNewGame} style={{position: 'absolute', top:'70%', left: '82%', zIndex: 100,  fontFamily:'dungeon'}} >Start Game</h1>
    <h1 className="overlay" onClick={displayCredits} style={{position: 'absolute', top:'77%', left: '82%', zIndex: 100,  fontFamily:'dungeon'}} >Credits</h1>
    <h1  className="overlay" onClick={displayTutorial}  style={{position: 'absolute', top:'84%', left: '82%', zIndex: 100,  fontFamily:'dungeon'}} >Tutorial</h1>
    <h1  style={{position: 'absolute', top:'5%', left: '5%', zIndex: 1,  fontFamily:'dungeon',color:'white', fontSize:'64px'}} >ProjecT PorO</h1>

    <div ref={tutorial} className="cui" style={{position: 'absolute', zIndex: 100, top:'15%'}} >
      <h1 style={{position: 'absolute', left: '2%', top:'3%', zIndex: 1,  fontFamily:'dungeon',color:'white', fontSize:'64px', width:'40%'}} >How to play?</h1>
      <img  onClick={closeTutorial} src={closeSrc} style={{position: 'absolute', top:'5%', left: '92%', zIndex: 100, width:'6%', opacity:'0.55'}} />

      <h4  style={{position: 'absolute', left: '3%', top: '20%', zIndex: 1,  fontFamily:'dungeon',color:'white', fontSize:'32px'}} >Controls</h4>
      <img src={keySrc} style={{position: 'absolute', top:'15%', left: '2%', zIndex: 100, width:'20%', opacity:'0.80'}} />
      <img src={mouseSrc} style={{position: 'absolute', top:'26%', left: '23%', zIndex: 100, width:'8%', opacity:'0.80'}} />
     
      <h4  style={{position: 'absolute', left: '3%', top: '50%', zIndex: 1,  fontFamily:'dungeon',color:'white', fontSize:'32px'}} >Weapons</h4>
      <img src={swordSrc} style={{position: 'absolute', top:'60%', left: '2%', zIndex: 100, width:'6%', opacity:'0.55'}} />

      <h4  style={{position: 'absolute', left: '50%', top: '20%', zIndex: 1,  fontFamily:'dungeon',color:'white', fontSize:'32px'}} >Collectibles</h4>
      <img src={chestSrc} style={{position: 'absolute', top:'28%', left: '49%', zIndex: 100, width:'8%',  opacity:'0.55'}} />
      <img src={potionSrc} style={{position: 'absolute', top:'28%', left: '58%', zIndex: 100, width:'8%',  opacity:'0.55'}} />
    
    </div>

    <div ref={credits} className="credits" style={{position: 'absolute', zIndex: 100, top:'15%'}} >
      <h1 style={{position: 'absolute', left: '2%', top:'5%', zIndex: 1,  fontFamily:'dungeon',color:'white', fontSize:'64px', width:'40%'}} >Made by</h1>
      <img  onClick={closeCredits} src={closeSrc} style={{position: 'absolute', top:'5%', left: '92%', zIndex: 100, width:'6%', opacity:'0.55'}} />

      <h4  style={{position: 'absolute', left: '3%', top: '30%', zIndex: 1,  fontFamily:'dungeon',color:'white', fontSize:'32px'}} >Jordan Gonzalez Bustamante</h4>
      <h4  style={{position: 'absolute', left: '3%', top: '55%', zIndex: 1,  fontFamily:'dungeon',color:'white', fontSize:'32px'}} >Luis Alfonso Alcantara Lopez Ortega</h4>
      
    </div>
    

    <Canvas shadowMap sRGB gl={{alpha: false, antialias: false}}>
    <fog attach="fog" args={["white", 0, 20]} />

      <Physics position={[3, 0, 1]} gravity={[0, 0, 0]}>

        <Cloud position={[-0, -5, 0]} rotation={[0,0,0]} />

        <Cloud position={[-1, -5, 0]} rotation={[0,0,0]} />
        <Cloud position={[-4, -5, 0]} rotation={[0,0,0]} />

        <Cloud position={[-3.5, -5, -1]} rotation={[0,0,0]} />
        <Cloud position={[-5, -5, -1]} rotation={[0,0,0]} />

        <Cloud position={[-7.5, -5.5, -1]} rotation={[0,0,0]} />




      </Physics>
      <ambientLight intensity={0.5} />
      <pointLight intensity={0.9} position={[-3, 0, 5]} />
    </Canvas>
  </>);
}