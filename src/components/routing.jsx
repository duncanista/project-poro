import React from 'react';

import { Start } from '../components/start';
import { Game } from '../components/game';

import { useGameStore } from '../store';
import { STATE } from 'three-stdlib';

export const Routing = () => {
  const { newGame } = useGameStore(state => ({ newGame: state.newGame}));
  return newGame ? (
    <Game/>
  ) : (
    <Start/>
  );

}