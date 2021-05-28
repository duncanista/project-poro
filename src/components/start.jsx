import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics, useBox, usePlane } from "@react-three/cannon";
import { Cloud } from "./cloud";
import swordSrc from '../images/sword.png';
import chestSrc from '../images/chest.png';
import potionSrc from '../images/potion.png';

import './assets/style.css';

import { useGame } from '../providers/game_provider';

export const Start = () => {
  const { setNewGame } = useGame();
  
  const startNewGame = () => {
    setNewGame(true);
  }  
  
  return (<>

    <h1 className="overlay" onClick={startNewGame} style={{position: 'absolute', top:'70%', left: '82%', zIndex: 100,  fontFamily:'dungeon'}} >Start Game</h1>
    <h1 className="overlay" style={{position: 'absolute', top:'77%', left: '82%', zIndex: 100,  fontFamily:'dungeon'}} >Credits</h1>
    <h1 className="overlay" style={{position: 'absolute', top:'84%', left: '82%', zIndex: 100,  fontFamily:'dungeon'}} >Tutorial</h1>
    <h1  style={{position: 'absolute', top:'5%', left: '5%', zIndex: 1,  fontFamily:'dungeon',color:'white', fontSize:'64px'}} >Project Poro</h1>

    <div  className="cui" style={{position: 'absolute', zIndex: 100, top:'15%'}} >
      <h1  style={{position: 'absolute', left: '65%', zIndex: 1,  fontFamily:'dungeon',color:'white', fontSize:'64px', width:'40%'}} >How to play?</h1>
      <h4  style={{position: 'absolute', left: '3%', top: '20%', zIndex: 1,  fontFamily:'dungeon',color:'white', fontSize:'32px'}} >Explore the dungeon to find all the treasures.</h4>
      <h4  style={{position: 'absolute', left: '3%', top: '45%', zIndex: 1,  fontFamily:'dungeon',color:'white', fontSize:'32px'}} >Beware of the wandering creatures.</h4>
      <h4  style={{position: 'absolute', left: '3%', top: '70%', zIndex: 1,  fontFamily:'dungeon',color:'white', fontSize:'32px'}} >Have patience, and you shall find potions.</h4>

    </div>
    <img src={swordSrc} style={{position: 'absolute', top:'27%', left: '45%', zIndex: 100, width:'3%', opacity:'0.55'}} />
    <img src={chestSrc} style={{position: 'absolute', top:'40%', left: '45%', zIndex: 100, width:'3%',  opacity:'0.55'}} />
    <img src={potionSrc} style={{position: 'absolute', top:'55%', left: '45%', zIndex: 100, width:'3%',  opacity:'0.55'}} />
    

    <Canvas shadowMap sRGB gl={{alpha: false, antialias: false}}>
    <fog attach="fog" args={["white", 0, 20]} />

      <Physics position={[3, -4, 1]} gravity={[0, 0, 0]}>
        <Cloud position={[1, -4, 1]} rotation={[0,0,Math.PI/8]} />
        <Cloud position={[-1, -4, 1]} rotation={[0,0,0]} />
        <Cloud position={[-4, -4, 1]} rotation={[0,0,Math.PI/9]} />
        <Cloud position={[-5, -4, 1]} rotation={[0,0,Math.PI/11]} />
        <Cloud position={[-6, -4, 1]} rotation={[0,0,Math.PI]} />


      </Physics>
      <ambientLight intensity={0.5} />
      <pointLight intensity={0.5} position={[5, 2, 5]} />
    </Canvas>
  </>);
}