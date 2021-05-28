import React from 'react';

import { useGame } from '../providers/game_provider';

export const Start = () => {
  const { setNewGame } = useGame();
  const startNewGame = () => {
    setNewGame(true);
  }
  
  return (<>
    <h1>This is the start screen</h1>
    <button onClick={startNewGame}>
      new game
    </button>
  </>);
}