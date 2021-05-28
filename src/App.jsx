import React from 'react';

import { Routing } from './components/routing';
import { GameProvider } from './providers/game_provider';

const App = () => {
  
  return (
    <div className='wrapper'>
      <GameProvider>
        <Routing/>
      </GameProvider>
    </div>
  );
}

export default App;
