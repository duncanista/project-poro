import React, { useContext, useState, useEffect, createContext } from 'react';

import { Loading } from '../components/loading';

const GameContext = createContext();

export function useGame(){
  return useContext(GameContext);
}

export const GameProvider = ({ children }) => { 
  const [newGame, setNewGame] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, [])

  return (
    <GameContext.Provider value={{ newGame, setNewGame }}>
        { ready ? children : ( <Loading/> )}
    </GameContext.Provider>
  )
}