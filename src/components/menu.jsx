import React, { useEffect, useRef } from 'react';

import swordSrc from '../assets/images/sword-3.png';
import chestSrc from '../assets/images/chest-3.png';
import potionSrc from '../assets/images/potion-2.png';

import { useGame } from '../providers/game_provider';

export const Menu = () => {
  const pause = useRef();
  const resume = useRef();
  const pauseScreen = useRef();

  const { health } = useGame();
  
  useEffect(() => {
    
    if (pause && pause.current){
      pause.current.addEventListener('click', () => {
        console.log('aaaa clicaste la pausa wacho');
      })
    }

    if(resume && resume.current && pauseScreen && pauseScreen.current) {
      resume.current.addEventListener('click', () => {
        pauseScreen.current.hidden = true;
      })
    }
  }, [])

  return <>

    <div ref={pauseScreen} className="overlay" style={{position: 'absolute', left: '0%', zIndex: 100}}  >
      <div className="overlay-content">
          <a ref={resume} href='#' style={{fontFamily:'dungeon'}}>Resume</a>
          <a id='quitButton' href='#' style={{fontFamily:'dungeon'}} >Quit</a>
      </div>
    </div>
    
    <div className="health-bar" data-total="100" data-value={health} style={{position: 'absolute', top:'2%', zIndex: 100}}>
        <div className="bar">
            <div className="hit"></div>
        </div>
    </div>
      <img src={swordSrc} alt={'sword'} style={{position: 'absolute', top:'2%', left: '5%', zIndex: 100, width:'3%', opacity:'0.85'}} />
      <img src={chestSrc} alt={'chest'} style={{position: 'absolute', top:'12%', left: '5%', zIndex: 100, width:'3%',  opacity:'0.85'}} />
      <img src={potionSrc} alt={'potion'} style={{position: 'absolute', top:'22%', left: '5%', zIndex: 100, width:'3%',  opacity:'0.85'}} />
      <h1 style={{position: 'absolute', top:'12%', left: '10%', zIndex: 100, width:'3%', color:'white', fontFamily:'dungeon'}} >1</h1>
      <h1 style={{position: 'absolute', top:'22%', left: '10%', zIndex: 100, width:'3%', color:'white', fontFamily:'dungeon'}} >2</h1>
  </>
}