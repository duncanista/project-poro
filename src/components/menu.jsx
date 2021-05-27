import React from 'react';
import './assets/style.css';
import swordSrc from '../images/sword.png';
import chestSrc from '../images/chest.png';
import potionSrc from '../images/potion.png';


export const Menu = () => {

    const openNav = () => {
        document.getElementById("pause").hidden = false;

      }
      
    const closeNav = () => {
        document.getElementById("pause").hidden = true;
    }
  return <>

    <div id="pause" class="overlay"style={{position: 'absolute', left: '0%', zIndex: 100}}  >
        <div class="overlay-content">
            <a onClick={closeNav} style={{fontFamily:'dungeon'}}>Resume</a>
            <a onClick={closeNav} style={{fontFamily:'dungeon'}} >Quit</a>
        </div>
    </div>
    <div class="health-bar" data-total="1000" data-value="1000" style={{position: 'absolute', top:'2%', zIndex: 100}}>
        <div class="bar">
            <div class="hit"></div>
        </div>
    </div>
      <img src={swordSrc} style={{position: 'absolute', top:'2%', left: '5%', zIndex: 100, width:'3%', opacity:'0.85'}} />
      <img src={chestSrc} style={{position: 'absolute', top:'10%', left: '5%', zIndex: 100, width:'3%',  opacity:'0.85'}} />
      <img src={potionSrc} style={{position: 'absolute', top:'18%', left: '5%', zIndex: 100, width:'3%',  opacity:'0.85'}} />
      <h1 style={{position: 'absolute', top:'1%', left: '10%', zIndex: 100, width:'13%', color:'white', fontFamily:'dungeon'}} >Iron Sword</h1>
      <h1 style={{position: 'absolute', top:'9%', left: '10%', zIndex: 100, width:'3%', color:'white', fontFamily:'dungeon'}} >1</h1>
      <h1 style={{position: 'absolute', top:'17%', left: '10%', zIndex: 100, width:'3%', color:'white', fontFamily:'dungeon'}} >2</h1>
    <button  onClick={openNav} style={{position: 'absolute', top:'45%', left: '5%', zIndex: 100}}>&#9776; open</button>
  </>
}