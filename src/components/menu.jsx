import React from 'react';
import './assets/style.css';

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
            <a onClick={closeNav}>Resume</a>
            <a onClick={closeNav} >Quit</a>
        </div>
    </div>
    <div class="health-bar" data-total="1000" data-value="1000" style={{position: 'absolute', left: '40%',top:'2%', zIndex: 100}}>
        <div class="bar">
            <div class="hit"></div>
        </div>
    </div>
    <button  onClick={openNav} style={{position: 'absolute',  left: '5%', zIndex: 100}}>&#9776; open</button>
  </>
}