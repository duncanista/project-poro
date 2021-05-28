import React from 'react';

import { Start } from '../components/start';
import { Game } from '../components/game';

import { useGame } from '../providers/game_provider';

export const Routing = () => {
  const { newGame } = useGame();
  return newGame ? (
    <Game/>
  ) : (
    <Start/>
  );

}