import React, { useContext, useState, useEffect, createContext } from 'react';

import { Loading } from '../components/loading';

const GameContext = createContext();

export function useGame(){
  return useContext(GameContext);
}

export const GameProvider = ({ children }) => { 
  const [newGame, setNewGame] = useState(true);
  const [ready, setReady] = useState(false);
  const [health, setHealth] = useState(100);

  useEffect(() => {
    setReady(true);
  }, [])

  return (
    <GameContext.Provider value={{ newGame, setNewGame, health, setHealth }}>
        { ready ? children : ( <Loading/> )}
    </GameContext.Provider>
  )
}